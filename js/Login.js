// script.js

// انتخاب تمام دکمه‌های رنگی
const colorButtons = document.querySelectorAll('.color-btn');


const circle1 = document.querySelector('.circle1');
const circle2 = document.querySelector('.circle2');
const btn=document.querySelector('.sing')
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
  
      if (usernameValue.length < 3) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "نام کاربری باید حداقل ۳ کاراکتر باشد.",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'small-modal'
          }
        });
        return;
      }
  
      if (passwordValue.length < 8) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
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
  
  