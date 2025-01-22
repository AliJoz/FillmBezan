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
                    customClass: { popup: "small-modal" },
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
                    customClass: { popup: "small-modal" },
                });
                return;
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "در حال بررسی ورود...",
                showConfirmButton: false,
                timer: 2000,
                customClass: { popup: "small-modal" },
            });


            fetch("http://localhost/proje/php/Login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
                body: JSON.stringify({ username: usernameValue, password: passwordValue }),
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log('Response:', response);
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
           
                
                .then((data) => {
                    console.log(data);
                    
                    if (data.success) {
                   
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: data.message || "ورود موفقیت‌آمیز بود!",
                            showConfirmButton: false,
                            timer: 2500,
                            customClass: { popup: "small-modal" },
                        });
            
                
                        successUserMessage.textContent = `${usernameValue}، شما وارد شده‌اید.`;
                        console.log(data);
                        
                        successMessage.classList.remove("hidden");
                        loginContainer.classList.add("hidden");
            
                 
                        fetch("http://localhost/proje/php/SessionCheck.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({ username: usernameValue }), 
                        })
                            .then((response) => response.json())
                            .then((sessionData) => {
                                if (sessionData.success) {
                                    console.log("سشن با موفقیت ذخیره شد");
                                } else {
                                    console.error("خطا در ذخیره سشن");
                                }
                            })
                            .catch((error) => {
                                console.error("خطا در ذخیره سشن:", error);
                            });
            
                        
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
                            customClass: { popup: "small-modal" },
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
                        customClass: { popup: "small-modal" },
                    });
                });
        });
    }
});

