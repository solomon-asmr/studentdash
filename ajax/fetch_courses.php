<?php
// Include Moodle configuration
require_once('../../../config.php');

// Authenticate user (if necessary)
require_login();

// Handle the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Perform any necessary operations here

    header('Access-Control-Allow-Origin: *');

    $courses = enrol_get_all_users_courses($USER->id);

    // Convert the $courses object to an associative array
    $courses_array = array();
    foreach ($courses as $course) {
        $courses_array[] = array(
            'id' => $course->id,
            'fullname' => $course->fullname,
        );
    }

    // Set the appropriate headers to indicate JSON response and allow cross-origin requests
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET'); // Adjust if needed (POST, PUT, etc.)
    header('Access-Control-Allow-Headers: Content-Type'); // Adjust if needed
    header('Content-Type: application/json');

    // Output the filtered course data as JSON
    echo json_encode($courses_array);
} else {
    // Handle unsupported request methods (e.g., POST, PUT, DELETE)
    http_response_code(405); // Method Not Allowed
}