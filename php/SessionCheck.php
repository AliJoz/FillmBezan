<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost");
header('Access-Control-Allow-Credentials: true');
session_start();


define('LOG_FILE', __DIR__ . '/app.log');

function writeLog($message)
{
    $date = date('Y-m-d H:i:s');
    $logMessage = "[$date] $message" . PHP_EOL;
    file_put_contents(LOG_FILE, $logMessage, FILE_APPEND);
}

$session_timeout = 5 * 60; // 5 دقیقه


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    writeLog("POST request received with data: " . file_get_contents('php://input'));

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['username'])) {
        $_SESSION['user_id'] = $data['username'];
        $_SESSION['last_activity'] = time();
        writeLog("Session created for user: {$data['username']}");

        echo json_encode([
            "success" => true,
            "message" => "سشن با موفقیت ذخیره شد."
        ]);
        exit;
    } else {
        writeLog("Username not provided in POST request");
    }
}


if (isset($_SESSION['user_id'])) {
    $current_time = time();
    writeLog("Session check for user: {$_SESSION['user_id']}");

    if ($current_time - $_SESSION['last_activity'] > $session_timeout) {
        writeLog("Session expired for user: {$_SESSION['user_id']}");
        session_unset();
        session_destroy();
        echo json_encode([
            "loggedIn" => false,
            "message" => "سشن شما منقضی شده است. لطفا دوباره وارد شوید."
        ]);
        exit;
    }

    $_SESSION['last_activity'] = $current_time;
    writeLog("Session active for user: {$_SESSION['user_id']}");

    echo json_encode([
        "loggedIn" => true,
        "username" => $_SESSION['user_id']
    ]);
} else {
    writeLog("No active session found");
    echo json_encode([
        "loggedIn" => false
    ]);
}

exit;
