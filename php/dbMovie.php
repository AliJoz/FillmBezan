<?php
$conn = new mysqli("localhost", "root", "", "FilmBezan");
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$description = $_POST['description'];
$genre = $_POST['genre'];
$director = $_POST['director'];
$producer = $_POST['producer'];
$cast = $_POST['cast'];
$image_url = $_POST['image_url'];
$trailer_url = $_POST['trailer_url'];

$sql = "INSERT INTO movies (name, description, genre, director, producer, cast, image_url, trailer_url)
        VALUES ('$name', '$description', '$genre', '$director', '$producer', '$cast', '$image_url', '$trailer_url')";

if ($conn->query($sql) === TRUE) {
    echo "اطلاعات فیلم با موفقیت ذخیره شد.";
} else {
    echo "خطا در ذخیره اطلاعات: " . $conn->error;
}

$conn->close();
?>
