<?php

// تنظیم هدرها برای CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// اطلاعات اتصال به دیتابیس
$host = "localhost";
$user = "root";
$password = "";
$dbname = "FilmBezan";

// اتصال به دیتابیس
$conn = new mysqli($host, $user, $password, $dbname);

// بررسی اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// بررسی نوع درخواست
if (isset($_GET['id'])) {
    // دریافت اطلاعات یک فیلم خاص
    $movieId = intval($_GET['id']);

    $sql = "SELECT * FROM movies WHERE id = $movieId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $movie = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($movie);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Movie not found."]);
    }
} elseif (isset($_GET['filter'])) {
    // دریافت لیست فیلم‌ها با فیلتر
    $filter = $_GET['filter'];

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
} else {
    // اگر هیچ پارامتری ارسال نشده باشد
    http_response_code(400);
    echo json_encode(["error" => "No valid parameter provided."]);
}

// بستن اتصال
$conn->close();

?>
