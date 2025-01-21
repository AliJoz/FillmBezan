<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

// مقدار مجاز Origin (اینجا می‌توانید دامنه‌های مجاز را تنظیم کنید)


// تنظیم هدرهای CORS
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// مدیریت درخواست‌های OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// فایل لاگ
$logFile = 'request.log';



// تابع ثبت داده‌ها در لاگ
function logData($message)
{
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
    file_put_contents($logFile, "[$timestamp] [IP: $ip] $message\n", FILE_APPEND);
}

// تنظیمات اتصال به پایگاه داده
$host = "localhost";
$username = "root";
$password = "";
$dbname = "Filmbezan";

try {
    // اتصال به پایگاه داده
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

// بررسی متد درخواست
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logData("درخواست نامعتبر با متد " . $_SERVER['REQUEST_METHOD']);
    echo json_encode([
        "success" => false,
        "message" => "درخواست نامعتبر است. تنها متد POST پذیرفته می‌شود."
    ]);
    exit;
}

// دریافت داده‌های ورودی
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

logData("ایمیل دریافت‌شده: $email");
if (empty($email)) {
    logData("ایمیل خالی ارسال شده است.");
    echo json_encode([
        "success" => false,
        "message" => "ایمیل نمی‌تواند خالی باشد."
    ]);
    exit;
}

if (empty($password)) {
    logData("رمز عبور خالی ارسال شده است.");
    echo json_encode([
        "success" => false,
        "message" => "رمز عبور نمی‌تواند خالی باشد."
    ]);
    exit;
}
try {
    // بررسی وجود کاربر
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

        // بررسی رمز عبور
        if (password_verify($password, $user['Password'])) {
            // ذخیره اطلاعات کاربر در session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];

            echo json_encode([
                "success" => true,
                "message" => "ورود موفقیت‌آمیز بود.",
                "username" => $user['email']
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "رمز عبور اشتباه است."
            ]);
        }
    } else {
        // ثبت کاربر جدید
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $insertQuery = "INSERT INTO users (Email, Password) VALUES (?, ?)";
        $insertStmt = $conn->prepare($insertQuery);

        if (!$insertStmt) {
            throw new Exception("خطا در آماده‌سازی کوئری افزودن: " . $conn->error);
        }

        $insertStmt->bind_param("ss", $email, $hashedPassword);
        if ($insertStmt->execute()) {
            logData("کاربر با موفقیت اضافه شد: $email");

            // ذخیره کاربر جدید در session
            $_SESSION['user_id'] = $insertStmt->insert_id;
            $_SESSION['email'] = $email;

            echo json_encode([
                "success" => true,
                "message" => "ثبت‌نام با موفقیت انجام شد و شما وارد شدید."
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
