<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "FilmBezan";


$conn = new mysqli($host, $user, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['movie_id']) || !isset($input['comment'])) {
        echo json_encode(['success' => false, 'message' => 'اطلاعات ارسال شده ناقص است.']);
        exit;
    }

    $movie_id = intval($input['movie_id']);
    $comment = trim($input['comment']);

    session_start();
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'کاربر وارد نشده است.']);
        exit;
    }

    $user_id = $_SESSION['user_id'];

    // اعتبارسنجی ورودی‌ها
    if (empty($comment)) {
        echo json_encode(['success' => false, 'message' => 'متن کامنت نمی‌تواند خالی باشد.']);
        exit;
    }

    // Insert comment into the database using mysqli
    $stmt = $conn->prepare("INSERT INTO comments (movie_id, user_id, comment) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $movie_id, $user_id, $comment);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'کامنت با موفقیت ثبت شد.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'خطا در ثبت کامنت.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'درخواست نامعتبر است.']);
}

$conn->close();

?>
