<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "FilmBezan";


$conn = new mysqli($host, $user, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (!isset($_GET['movie_id'])) {
        echo json_encode(['success' => false, 'message' => 'شناسه فیلم ارسال نشده است.']);
        exit;
    }

    $movie_id = intval($_GET['movie_id']);


    $sql = "SELECT c.comment, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.movie_id = ? ORDER BY c.created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $movie_id);
    $stmt->execute();
    $result = $stmt->get_result();

   
    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }

    echo json_encode($comments);
} else {
    echo json_encode(['success' => false, 'message' => 'درخواست نامعتبر است.']);
}

$conn->close();
?>
