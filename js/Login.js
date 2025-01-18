
const colorButtons = document.querySelectorAll('.color-btn');
const circle1 = document.querySelector('.circle1');
const circle2 = document.querySelector('.circle2');
const btn = document.querySelector('.sing');

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = window.getComputedStyle(button).backgroundColor;
        btn.style.backgroundColor = color;
        circle1.style.backgroundColor = color;
        circle2.style.backgroundColor = color;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const successMessage = document.getElementById("successMessage");
    const successUserMessage = document.getElementById("successUserMessage");
    const loginContainer = document.getElementById("loginContainer");

    
    const registrationInfo = JSON.parse(localStorage.getItem("registrationInfo"));
    
    if (registrationInfo) {
        const { username: registeredUsername, timestamp } = registrationInfo;
        const elapsedTime = (Date.now() - timestamp) / 1000; // مدت زمان گذشته از ثبت‌نام به ثانیه

        if (elapsedTime < 120) {
           
            successUserMessage.textContent = `${registeredUsername}، شما ثبت‌نام کرده‌اید.`;
            successMessage.classList.remove("hidden");
            loginContainer.classList.add("hidden");
        } else {
           
            localStorage.removeItem("registrationInfo");
            successMessage.classList.add("hidden");
            loginContainer.classList.remove("hidden");
        }
    } else {
        
        successMessage.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const usernameValue = username.value.trim();
            const passwordValue = password.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if (!emailRegex.test(usernameValue)) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "ایمیل وارد شده معتبر نیست.",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { popup: 'small-modal' }
                });
                return;
            }

          
            if (!passwordRegex.test(passwordValue)) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف و اعداد باشد.",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { popup: 'small-modal' }
                });
                return;
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "در حال بررسی ورود...",
                showConfirmButton: false,
                timer: 2000,
                customClass: { popup: 'small-modal' }
            });

            fetch("http://localhost/proje/php/Login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: usernameValue, password: passwordValue }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                    
                        
                        window.location.href = `index.html?username=${encodeURIComponent(data.username)}`;
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: data.message || "ورود موفقیت‌آمیز بود!",
                            showConfirmButton: false,
                            timer: 2500,
                            customClass: { popup: 'small-modal' }
                        });

                       
                        localStorage.setItem(
                            "registrationInfo",
                            JSON.stringify({
                                username: usernameValue,
                                timestamp: Date.now()
                            })
                        );

                        // هدایت به صفحه ایندکس
                        setTimeout(() => {
                            
                            window.location.href = "index.html";
                        }, 2000);
                    } else {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: data.message || "ورود ناموفق بود.",
                            showConfirmButton: false,
                            timer: 2500,
                            customClass: { popup: 'small-modal' }
                        });
                    }
                })
                .catch(() => {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "مشکلی در ارتباط با سرور پیش آمد.",
                        showConfirmButton: false,
                        timer: 2500,
                        customClass: { popup: 'small-modal' }
                    });
                });
        });
    }
});
