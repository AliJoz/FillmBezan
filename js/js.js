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


    const themeToggle = document.getElementById('theme-toggle');

  // تغییر تم با کلیک روی آیکون

  if (
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // ذخیره تم روشن
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // ذخیره تم تاریک
    }
  });