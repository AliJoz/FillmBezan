<?php
session_start(); 


$host = "localhost";
$username = "root";
$password = "";
$dbname = "FilmBezan";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("خطا در اتصال به پایگاه داده: " . $conn->connect_error);
}

if (!isset($_SESSION['user_id'])) {
    echo "لطفاً ابتدا وارد حساب کاربری خود شوید.";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $movie_id = intval($_POST['movie_id']);
    $user_id = $_SESSION['user_id']; // آی‌دی کاربر از جلسه
    $comment = $conn->real_escape_string($_POST['comment']);


    if (empty($comment)) {
        echo "متن کامنت نمی‌تواند خالی باشد.";
        exit;
    }


    $sql = "INSERT INTO comments (movie_id, user_id, comment) VALUES ('$movie_id', '$user_id', '$comment')";
    if ($conn->query($sql) === TRUE) {
        echo "کامنت شما با موفقیت ثبت شد.";
    } else {
        echo "خطا در ثبت کامنت: " . $conn->error;
    }
}

$conn->close();
?>
