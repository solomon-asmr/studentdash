<?php
// Include Moodle configuration
require_once('../../../config.php');
require_once($CFG->dirroot . '/calendar/lib.php'); // for fetching calendar events

// Authenticate user (if necessary)
require_login();

// Handle the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Fetch user details
    $user = $DB->get_record('user', array('id' => $USER->id));

    // Fetch grades for the current user
    $grades = fetch_user_grades($USER->id);

    // Calculate average grade for the user
    $averageGrade = calculate_average_grade($grades);

    // Initialize data array
    $data = array(
        'studentID' => $user->idnumber,
        'firstname' => $user->firstname,
        'lastname' => $user->lastname,
        'institution' => $user->institution,
        'department' => $user->department,
        'email' => $user->email,
        'phone' => $user->phone1,
        'average' => $averageGrade,
        'courses' => fetch_user_courses($USER->id)
    );

    // Set the appropriate headers to indicate JSON response and allow cross-origin requests
    set_json_headers();

    // Output the response data as JSON
    echo json_encode($data);

} else {
    // Handle unsupported request methods (e.g., POST, PUT, DELETE)
    handle_invalid_request();
}

function fetch_user_grades($userId)
{
    global $DB;

    $gradesSQL = "
        SELECT
            gg.finalgrade AS grade
        FROM
            {grade_grades} gg
        JOIN
            {grade_items} gi ON gi.id = gg.itemid
        WHERE
            gi.itemtype = 'course'
            AND gg.userid = :userid
    ";

    return $DB->get_records_sql($gradesSQL, array('userid' => $userId));
}

function calculate_average_grade($grades)
{
    $totalGrades = 0;
    $count = count($grades);

    if ($count > 0) {
        foreach ($grades as $grade) {
            $totalGrades += $grade->grade;
        }
        return round($totalGrades / $count, 2);
    } else {
        return 0;
    }
}

function fetch_user_courses($userId)
{
    global $DB;

    $courses = enrol_get_all_users_courses($userId);
    $userCourses = array();

    foreach ($courses as $course) {
        // Fetch lecturer details
        $context = context_course::instance($course->id);
        $roles = get_role_users(3, $context);  // Assuming role id 3 for lecturers
        $lecturer = reset($roles);  // Get the first lecturer found


        $courseData = array(
            'id' => $course->id,
            'fullname' => $course->fullname,
            'lecturer' => fullname($lecturer),
            'lectureremail' => $lecturer->email,
            'url' => (new moodle_url('/course/view.php', array('id' => $course->id)))->out(false),
            'tasks' => fetch_course_tasks($userId, $course->id),
            'events' => fetch_course_events($userId, $course->id)
        );
        $userCourses[] = $courseData;
    }

    return $userCourses;
}


function fetch_course_tasks($userId, $courseId)
{
    global $DB;

    $assignmentsSQL = "
        SELECT
            'Assignment' AS Task_Type,
            a.name AS Task_Name,
            DATE(FROM_UNIXTIME(a.duedate)) AS Due_Date,
            CASE
                WHEN s.id IS NOT NULL THEN 'Submitted'
                ELSE 'Not Submitted'
            END AS Task_Status,
            CASE
                WHEN s.id IS NOT NULL THEN FROM_UNIXTIME(s.timemodified)
                ELSE NULL
            END AS Modify_Date
        FROM
            {user} u
        JOIN
            {user_enrolments} ue ON ue.userid = u.id
        JOIN
            {enrol} e ON e.id = ue.enrolid
        JOIN
            {course} c ON c.id = e.courseid
        JOIN
            {context} ctx ON ctx.contextlevel = 50 AND ctx.instanceid = c.id
        JOIN
            {modules} m ON m.name = 'assign'
        JOIN
            {course_modules} cm ON cm.module = m.id AND cm.course = c.id
        JOIN
            {assign} a ON cm.instance = a.id
        LEFT JOIN
            {assign_submission} s ON s.assignment = a.id AND s.userid = u.id
        WHERE
            u.id = :userid
            AND c.id = :courseid
    ";
    $assignments = $DB->get_recordset_sql($assignmentsSQL, array('userid' => $userId, 'courseid' => $courseId));

    $quizzesSQL = "
        SELECT
            'Quiz' AS Task_Type,
            q.name AS Task_Name,
            DATE(FROM_UNIXTIME(q.timeclose)) AS Due_Date,
            CASE
                WHEN qa.id IS NOT NULL THEN 'Submitted'
                ELSE 'Not Submitted'
            END AS Task_Status,
            CASE
                WHEN qa.timefinish IS NOT NULL THEN FROM_UNIXTIME(qa.timefinish)
                ELSE NULL
            END AS Modify_Date
        FROM
            {user} u
        JOIN
            {user_enrolments} ue ON ue.userid = u.id
        JOIN
            {enrol} e ON e.id = ue.enrolid
        JOIN
            {course} c ON c.id = e.courseid
        JOIN
            {context} ctx ON ctx.contextlevel = 50 AND ctx.instanceid = c.id
        JOIN
            {modules} m ON m.name = 'quiz'
        JOIN
            {course_modules} cm ON cm.module = m.id AND cm.course = c.id
        JOIN
            {quiz} q ON cm.instance = q.id
        LEFT JOIN
            (
                SELECT qa.id, qa.timefinish, qa.userid, qa.quiz
                FROM {quiz_attempts} qa
                JOIN (
                    SELECT MAX(id) AS id
                    FROM {quiz_attempts}
                    GROUP BY quiz, userid
                ) maxqa ON maxqa.id = qa.id
            ) qa ON qa.quiz = q.id AND qa.userid = u.id
        WHERE
            u.id = :userid
            AND c.id = :courseid
    ";
    $quizzes = $DB->get_recordset_sql($quizzesSQL, array('userid' => $userId, 'courseid' => $courseId));

    $tasks = array();
    foreach ($assignments as $assignment) {
        $tasks[] = (array)$assignment;
    }
    foreach ($quizzes as $quiz) {
        $tasks[] = (array)$quiz;
    }

    return $tasks;
}

function fetch_course_events($userId, $courseId)
{
    global $DB;

    $start = strtotime('today');
    $end = strtotime('+365 days', $start);
    $calendarEvents = calendar_get_legacy_events($start, $end, array($userId), false, $courseId);

    $courseEvents = array();
    foreach ($calendarEvents as $event) {

        $courseEvents[] = array(
            'id' => $event->id,
            'name' => $event->name,
            'description' => $event->description,
            'timestart' => date("F j, Y", $event->timestart),
            'timeduration' => $event->timeduration
        );
    }

    return $courseEvents;
}

function set_json_headers()
{
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET'); // Adjust if needed for POST, PUT, etc.
    header('Access-Control-Allow-Headers: Content-Type'); // Adjust if needed
    header('Content-Type: application/json');
}

function handle_invalid_request()
{
    http_response_code(405); // Method Not Allowed
}
