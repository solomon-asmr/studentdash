<?php
// Include Moodle configuration
require_once('../../../config.php');
require_once($CFG->dirroot . '/lib/moodlelib.php'); // for sending emails
require_once($CFG->dirroot . '/lib/accesslib.php'); // for fetching roles and users

// Authenticate user (if necessary)
require_login();

global $DB, $USER;

$now = time();
$one_day = 86400;

// Fetch all exams that are 7, 3, or 1 day away
$upcoming_exams = $DB->get_records_sql("
    SELECT e.*, c.fullname AS coursename, u.id AS userid, u.email, u.firstname
    FROM {exams} e
    JOIN {course} c ON e.courseid = c.id
    JOIN {user_enrolments} ue ON ue.enrolid = c.id
    JOIN {user} u ON u.id = ue.userid
    WHERE (e.exam_date = :sevendays OR e.exam_date = :threedays OR e.exam_date = :oneday)",
    [
        'sevendays' => $now + 7 * $one_day,
        'threedays' => $now + 3 * $one_day,
        'oneday' => $now + $one_day
    ]
);

foreach ($upcoming_exams as $exam) {
    $days_left = ceil(($exam->exam_date - $now) / $one_day);
    $subject = "Upcoming Exam Date";
    $body = "
        Please note,
        In the {$exam->coursename} course, the {$exam->exam_type} will take place in {$days_left} days.
        Best regards,
        The StudentDash Team
    ";

    // Send email
    email_to_user($exam, core_user::get_support_user(), $subject, $body);
}

echo "Exam alert emails sent successfully.";
