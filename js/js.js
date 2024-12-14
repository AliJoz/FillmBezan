let currentIndex = 0;
const itemsPerSlide = 4;
let autoSlideInterval;

function updateSlider() {
    const slider = document.getElementById('slider');
    const slideWidth = slider.querySelector('.slide').clientWidth;
    slider.style.transform = `translateX(${currentIndex * slideWidth}px)`;
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    if (currentIndex + itemsPerSlide < totalSlides) {
        currentIndex += 1;
    } else {
        currentIndex = 0; // بازگشت به شروع
    }
    updateSlider();
    resetAutoSlide();
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    if (currentIndex > 0) {
        currentIndex -= 1;
    } else {
        currentIndex = totalSlides - itemsPerSlide; // بازگشت به انتها
    }
    updateSlider();
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// اطمینان از تنظیم صحیح اسلایدر هنگام تغییر اندازه پنجره
window.addEventListener('resize', () => {
    updateSlider();
});

// شروع اسلایدر خودکار
startAutoSlide();

    // btn them 
let togglebtn = document.querySelectorAll(".btnThem");

togglebtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let changeIcons = document.querySelectorAll(".icon-light");
    let c = document.querySelector(".changeName"); 

    
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); 
      changeIcons.forEach(function (icon) {
        icon.setAttribute("href", "#sun"); 
      });
      c.innerHTML = "تم روشن"; 
    } else {
      
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); 
      changeIcons.forEach(function (icon) {
        icon.setAttribute("href", "#moon"); 
      });
      c.innerHTML = "تم تیره"; 
    }
  });
});


window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    document.querySelectorAll(".icon-light").forEach((icon) => {
      icon.setAttribute("href", "#moon");
    });
    document.querySelector(".changeName").innerHTML = "تم تیره";
  } else {
    document.documentElement.classList.remove("dark");
    document.querySelectorAll(".icon-light").forEach((icon) => {
      icon.setAttribute("href", "#sun");
    });
    document.querySelector(".changeName").innerHTML = "تم روشن";
  }
});
// meno
window.addEventListener('scroll', function() {
    var menu = document.getElementById('menu');
    if (window.scrollY > 120) {
      menu.classList.add('hiddenMeno');  
    } else {
      menu.classList.remove('hiddenMeno');  
    }
  });
  
  