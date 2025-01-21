<?php
session_start(); // شروع session




if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 3600, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
}


header('Content-Type: application/json');
echo json_encode([
    "success" => true,
    "message" => "Session پاک شد و کاربر خارج شد."
]);
exit;
