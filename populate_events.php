<?php
// to run the script u have to purge_caches after pulling the file and then go to '/local/studentdash/populate_events.php' on your browser.
// it will create 13 practices and 13 lectures for each course defined on the db


require_once('../../config.php');
require_once($CFG->dirroot . '/calendar/lib.php');
require_once($CFG->dirroot . '/course/lib.php');

require_login();

if (!is_siteadmin()) {
    die('You must be an admin to run this script.');
}

// Fetch all courses
$courses = $DB->get_records('course', null, '', 'id,fullname');

// Function to create events
function create_event($courseid, $name, $description, $timestart, $duration)
{
    global $USER;

    $event = new stdClass();
    $event->name = $name;
    $event->description = $description;
    $event->format = FORMAT_HTML;
    $event->courseid = $courseid;
    $event->groupid = 0;
    $event->userid = $USER->id;
    $event->repeatid = 0;
    $event->modulename = '';
    $event->instance = 0;
    $event->eventtype = 'course';
    $event->timestart = $timestart;
    $event->timeduration = $duration;
    $event->visible = 1;
    $event->timemodified = time();

    return calendar_event::create($event);
}

// Define event details
$lecture_duration = 3 * 3600; // 3 hours in seconds
$practice_duration = 1.5 * 3600; // 1.5 hours in seconds
$days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
$current_time = time();
$week_seconds = 7 * 24 * 3600;

// Iterate over courses and create events
$course_index = 0;
foreach ($courses as $course) {
    if ($course->id == 1) {
        continue; // Skip the site course
    }
    $day_offset = $course_index % 5; // Ensure courses are distributed over weekdays
    for ($week = 0; $week < 13; $week++) {
        $base_time = strtotime("next {$days_of_week[$day_offset]}", $current_time) + ($week * $week_seconds);

        // Create a lecture event
        $lecture_time = $base_time + (9 * 3600); // 9:00 AM
        create_event($course->id, "Lecture Week " . ($week + 1), "Lecture.", $lecture_time, $lecture_duration);

        // Create a practice event
        $practice_time = $base_time + (13 * 3600); // 1:00 PM
        create_event($course->id, "Practice Week " . ($week + 1), "Practice.", $practice_time, $practice_duration);
    }
    $course_index++;
}

echo "Events have been created successfully.";
