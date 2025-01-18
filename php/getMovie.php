<?php
// تنظیم نوع محتوا برای ارسال JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



$conn = new mysqli("localhost", "root", "", "FilmBezan");


if ($conn->connect_error) {
    die(json_encode(["error" => "Failed to connect to database."]));
}


$sql = "SELECT id, name, description, genre, director, image_url, trailer_url, year, quality, rating FROM movies";
$result = $conn->query($sql);


$movies = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
}


echo json_encode($movies);


$conn->close();
?>
