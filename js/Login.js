// script.js

// انتخاب تمام دکمه‌های رنگی
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
                customClass: {
                    popup: 'small-modal'
                }
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
                customClass: {
                    popup: 'small-modal'
                }
            });
            return;
        }

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "ورود موفقیت‌آمیز بود!",
            showConfirmButton: false,
            timer: 2500,
            customClass: {
                popup: 'small-modal'
            }
        });
    });
});
