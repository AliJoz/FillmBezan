<?php
// تنظیم نوع محتوا برای ارسال JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// اتصال به پایگاه داده
$conn = new mysqli("localhost", "root", "", "FilmBezan");

// بررسی اتصال به پایگاه داده
if ($conn->connect_error) {
    die(json_encode(["error" => "Failed to connect to database."]));
}

// اجرای کوئری برای دریافت فیلم‌ها
$sql = "SELECT id, name, description, genre, director, image_url, trailer_url, year, quality, rating FROM movies";
$result = $conn->query($sql);

// تبدیل نتیجه به آرایه
$movies = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
}

// ارسال داده‌ها به صورت JSON
echo json_encode($movies);

// بستن اتصال به پایگاه داده
$conn->close();
?>
