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
        currentIndex = 0; 
    }
    updateSlider();
    resetAutoSlide();
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    if (currentIndex > 0) {
        currentIndex -= 1;
    } else {
        currentIndex = totalSlides - itemsPerSlide; 
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


window.addEventListener('resize', () => {
    updateSlider();
});


startAutoSlide();

    // btn them 
let togglebtn = document.querySelectorAll(".btnThem");

togglebtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let changeIcons = document.querySelectorAll(".icon-light");
    let c = document.querySelectorAll(".changeName"); 

    console.log(c)
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); 
      changeIcons.forEach(function (icon) {
        icon.setAttribute("href", "#sun"); 
      });
      c.forEach((c) => {
         c.innerHTML = "تم روشن"; 
      });
     
    } else {
      
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); 
      changeIcons.forEach(function (icon) {
        icon.setAttribute("href", "#moon"); 
      });
      c.forEach((c) => {
        c.innerHTML = "تم تیره"; 
     });
      
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
  // انتخاب عناصر


const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const subMenu = document.getElementById("subMenu");
const toggleTheme = document.getElementById("toggleTheme");
const overlay = document.getElementById("overlay");
const html = document.documentElement;

// نمایش منو
menuBtn.addEventListener("click", () => {
  subMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");

});
closeMenu.addEventListener('click',()=>{
  subMenu.classList.add('hidden')
  overlay.classList.add("hidden");
})

