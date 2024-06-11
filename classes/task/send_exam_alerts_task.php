<?php
namespace local_studentdash\task;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/moodlelib.php'); // For sending emails

class send_exam_alerts_task extends \core\task\scheduled_task {

    public function get_name() {
        return get_string('send_exam_alerts', 'local_studentdash');
    }

    public function execute() {
        global $DB;

        $now = time();
        $one_day = 86400; // One day in seconds
        $alert_days = [7, 3, 1]; // Days before the exam to send alerts

        foreach ($alert_days as $days_before) {
            $start_date = $now + ($days_before * $one_day);
            $end_date = $start_date + $one_day - 1;

            $sql = "
                SELECT e.*, c.fullname as coursename, u.email
                FROM {exams} e
                JOIN {course} c ON e.courseid = c.id
                JOIN {user_enrolments} ue ON ue.enrolid = (
                    SELECT id FROM {enrol} WHERE courseid = e.courseid LIMIT 1
                )
                JOIN {user} u ON u.id = ue.userid
                WHERE e.exam_date BETWEEN :start_date AND :end_date
            ";

            $upcoming_exams = $DB->get_records_sql($sql, [
                'start_date' => $start_date,
                'end_date' => $end_date,
            ]);

            foreach ($upcoming_exams as $exam) {
                $days_left = ceil(($exam->exam_date - $now) / $one_day);
                $subject = "Upcoming Exam Date";
                $body = "
                    Please note,
                    In the {$exam->coursename} course, the {$exam->exam_type} will take place in {$days_left} days.
                    Best regards,
                    The StudentDash Team
                ";

                email_to_user((object)[
                    'email' => $exam->email
                ], null, $subject, $body);
            }
        }
    }
}
?>
