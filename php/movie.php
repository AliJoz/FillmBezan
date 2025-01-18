<?php
$conn = new mysqli("localhost", "root", "", "FilmBezan");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'];
$sql = "SELECT * FROM movies WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $movie = $result->fetch_assoc();
    ?>
    <!DOCTYPE html>
    <html lang="fa">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $movie['name']; ?></title>
    </head>
    <body>
        <h1><?php echo $movie['name']; ?></h1>
        <p><strong>معرفی:</strong> <?php echo $movie['description']; ?></p>
        <p><strong>ژانر:</strong> <?php echo $movie['genre']; ?></p>
        <p><strong>کارگردان:</strong> <?php echo $movie['director']; ?></p>
        <p><strong>تهیه‌کننده:</strong> <?php echo $movie['producer']; ?></p>
        <p><strong>بازیگران:</strong> <?php echo $movie['cast']; ?></p>
        <img src="<?php echo $movie['image_url']; ?>" alt="<?php echo $movie['name']; ?>" style="width:300px;">
        <p><a href="<?php echo $movie['trailer_url']; ?>">مشاهده تیزر</a></p>
    </body>
    </html>
    <?php
} else {
    echo "فیلمی با این مشخصات یافت نشد.";
}

$conn->close();
?>
