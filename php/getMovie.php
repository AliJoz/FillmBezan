<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



$host = "localhost";
$user = "root";
$password = "";
$dbname = "FilmBezan";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$filter = isset($_GET['filter']) ? $_GET['filter'] : '';


if ($filter === 'animation') {
    $sql = "SELECT * FROM movies WHERE category = 'animation'";
} elseif ($filter === 'cinema') {
    $sql = "SELECT * FROM movies WHERE category = 'cinema'";
} elseif ($filter === 'online') {
    $sql = "SELECT * FROM movies WHERE category = 'online'";
} else {
    $sql = "SELECT * FROM movies"; 
}

$result = $conn->query($sql);


$movies = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
}


header('Content-Type: application/json');
echo json_encode($movies);

$conn->close();
?>
