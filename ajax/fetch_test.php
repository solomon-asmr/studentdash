<?php
// Include Moodle configuration
require_once('../../../config.php');

// Authenticate user (if necessary)
require_login();

// Handle the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Perform any necessary operations here

    $user = $DB->get_record('user', array('id' => $USER->id));

    $data = array(
        'studentID' => $user->idnumber,
        'firstname' => $user->firstname,
        'lastname' => $user->lastname,
        'institution' => $user->institution,
        'department' => $user->department,
        'email' => $user->email,
        'phone' => $user->phone1,
        'courses' => array()
    );

    // Get the user's courses
    $courses = enrol_get_all_users_courses($USER->id);

    // Loop through each course
    foreach ($courses as $course) {
        // Fetch assignments for the current course
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
        $assignments = $DB->get_recordset_sql($assignmentsSQL, array('userid' => $USER->id, 'courseid' => $course->id));

        // Fetch quizzes for the current course
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
        $quizzes = $DB->get_recordset_sql($quizzesSQL, array('userid' => $USER->id, 'courseid' => $course->id));

        // Assign tasks to the course object
        $tasks = array();

        // Add assignments to tasks array
        foreach ($assignments as $assignment) {
            $tasks[] = (array)$assignment;
        }

        // Add quizzes to tasks array
        foreach ($quizzes as $quiz) {
            $tasks[] = (array)$quiz;
        }

        // Assign tasks to the course object
        $course_data = array(
            'id' => $course->id,
            'fullname' => $course->fullname,
            'tasks' => $tasks
        );

        // Add course data to the courses array
        $data['courses'][] = $course_data;
    }

    // Set the appropriate headers to indicate JSON response and allow cross-origin requests
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET'); // Adjust if needed (POST, PUT, etc.)
    header('Access-Control-Allow-Headers: Content-Type'); // Adjust if needed
    header('Content-Type: application/json');

    // Output the response data as JSON
    echo json_encode($data);
} else {
    // Handle unsupported request methods (e.g., POST, PUT, DELETE)
    http_response_code(405); // Method Not Allowed
}