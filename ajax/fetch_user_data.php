<?php
// Include Moodle configuration
require_once('../../../config.php');

// Authenticate user (if necessary)
require_login();

// Handle the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Perform any necessary operations here

    header('Access-Control-Allow-Origin: http://localhost:3000/');

    $data = array('studentID' => $USER->id,
        'firstname' => $USER->firstname,
        'lastname' => $USER->lastname
    );


    // Set the appropriate headers to indicate JSON response and allow cross-origin requests
    header('Content-Type: application/json');

    // Output the user data as JSON
    echo json_encode($data);
} else {
    // Handle unsupported request methods (e.g., POST, PUT, DELETE)
    http_response_code(405); // Method Not Allowed
}
?>
