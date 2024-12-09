let currentIndex = 0;

    function updateSlider() {
        const slider = document.getElementById('slider');
        const slideWidth = slider.querySelector('.slide').clientWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function prevSlide() {
        const totalSlides = document.querySelectorAll('.slide').length;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
    }

    function nextSlide() {
        const totalSlides = document.querySelectorAll('.slide').length;
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }

    window.addEventListener('resize', updateSlider);



// meno
window.addEventListener('scroll', function() {
    var menu = document.getElementById('menu');
    if (window.scrollY > 120) {
      menu.classList.add('hiddenMeno');  
    } else {
      menu.classList.remove('hiddenMeno');  
    }
  });