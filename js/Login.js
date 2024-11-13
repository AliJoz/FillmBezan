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
