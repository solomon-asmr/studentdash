<?php

defined('MOODLE_INTERNAL') || die();

$tasks = array(
    array(
        'classname' => 'local_studentdash\task\send_exam_alerts_task',
        'blocking' => 0,
        'minute' => '0',
        'hour' => '6',
        'day' => '*',
        'month' => '*',
        'dayofweek' => '*',
        'disabled' => 0
    ),
);
?>
