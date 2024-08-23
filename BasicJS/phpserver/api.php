<?php

// Sample API key for demonstration purposes
define('API_KEY', 'test');

// Function to handle API requests
function handleRequest() {
    // Check if 'api_key' is provided in the URL parameters
    if (!isset($_GET['api_key'])) {
        response(400, 'API key is missing.');
        return;
    }

    // Retrieve the API key from the URL parameters
    $apiKey = $_GET['api_key'];

    // Validate the API key
    if ($apiKey !== API_KEY) {
        response(401, 'Invalid API key.');
        return;
    }

    // Process the request if the API key is valid
    // For example, return some data (this part can be customized)
    $data = [
        'message' => 'API key is valid.',
        'data' => [
            'item1' => 'value1',
            'item2' => 'value2',
        ],
    ];

    response(200, 'Success', $data);
}

// Function to send a JSON response
function response($status, $status_message, $data = null) {
    header("HTTP/1.1 " . $status . " " . $status_message);
    header("Content-Type: application/json");

    $response = [
        'status' => $status,
        'status_message' => $status_message,
        'data' => $data,
    ];

    echo json_encode($response);
}

// Handle the request
handleRequest();

?>