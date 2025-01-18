<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


$logFile = 'request.log';
session_start();

function logData($message)
{
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
    file_put_contents($logFile, "[$timestamp] [IP: $ip] $message\n", FILE_APPEND);
}


$host = "localhost";
$username = "root";
$password = "";
$dbname = "Filmbezan";


try {
    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("ارتباط با پایگاه داده برقرار نشد: " . $conn->connect_error);
    }
    logData("اتصال موفق به پایگاه داده.");
} catch (Exception $e) {
    logData("خطا در اتصال به دیتابیس: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "message" => "خطا در اتصال به پایگاه داده."
    ]);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logData("درخواست نامعتبر با متد " . $_SERVER['REQUEST_METHOD']);
    echo json_encode([
        "success" => false,
        "message" => "درخواست نامعتبر است. تنها متد POST پذیرفته می‌شود."
    ]);
    exit;
}


$input = file_get_contents("php://input");
logData("داده خام دریافت‌شده: $input");

$data = json_decode($input, true);


if (!isset($data['username']) || !isset($data['password'])) {
    logData("داده‌های ورودی نامعتبر: " . json_encode($data));
    echo json_encode([
        "success" => false,
        "message" => "ایمیل یا رمز عبور ارسال نشده است."
    ]);
    exit;
}

$email = trim($data['username']); 
$password = trim($data['password']);
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

logData("ایمیل دریافت‌شده: $email");

try {

    $query = "SELECT * FROM users WHERE Email = ?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception("خطا در آماده‌سازی کوئری: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        logData("ایمیل در سیستم موجود است: " . json_encode($user));
        echo json_encode([
            "success" => true,
            "message" => "کاربر قبلاً ثبت شده است.",
            "username"=>$user['email']
        ]);
    } else {
       
        $insertQuery = "INSERT INTO users (Email, Password) VALUES (?, ?)";
        $insertStmt = $conn->prepare($insertQuery);

        if (!$insertStmt) {
            throw new Exception("خطا در آماده‌سازی کوئری افزودن: " . $conn->error);
        }

        $insertStmt->bind_param("ss", $email, $hashedPassword);
        if ($insertStmt->execute()) {
            logData("کاربر با موفقیت اضافه شد: $email");
            echo json_encode([
                "success" => true,
                "message" => "کاربر با موفقیت ثبت شد."
            ]);
        } else {
            throw new Exception("خطا در ثبت کاربر: " . $insertStmt->error);
        }
    }
} catch (Exception $e) {
    logData("خطا در اجرای کوئری: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "message" => "خطا در پردازش درخواست."
    ]);
} finally {

    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($insertStmt)) {
        $insertStmt->close();
    }
    $conn->close();
    logData("اتصال به دیتابیس بسته شد.");
}
exit;
