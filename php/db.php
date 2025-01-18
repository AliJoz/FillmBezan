<?php
$host = "localhost";
$username = "root";
$password = ""; 
$dbname = "FilmBezan"; 

$conn = new mysqli($host, $username, $password, $dbname);


if ($conn->connect_error) {
    die("IS not Connected " . $conn->connect_error);
}
echo "IS succses";
?>
