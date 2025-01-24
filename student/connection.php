<?php
// Database configuration
$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'student_database';

// Create a new database connection
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize form inputs
    $username = $conn->real_escape_string($_POST['username']);
    $password = $conn->real_escape_string($_POST['password']);

    // Query to check if the username and password match in the `users` table
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // If a matching record is found, login is successful
        if ($username == 'ruksana') {
            header("Location: portfolio.html?message=success");
        } elseif ($username == 'arshad') {
            header("Location: portfolio2.html?message=success");
        } elseif ($username == 'rajitha') {
            header("Location: portfolio3.html?message=success");
        }
        exit;
    } else {
        // If no matching record is found, redirect back to the login page with an error message
        header("Location: index.html?error=1");
        exit;
    }
}

// Close the database connection
$conn->close();
?>
