// Variables
let currentIndex = 0;
let itemsPerSlide = 4;
let autoSlideInterval;

// Update the slider position
function updateSlider() {
  const slider = document.getElementById("slider");
  if (slider) {
    const slide = slider.querySelector(".slide");
    if (slide) {
      const slideWidth = slide.clientWidth;
      slider.style.transform = `translateX(${currentIndex * slideWidth}px)`;
    }
  }
}

// Adjust items per slide based on screen width
function updateItemsPerSlide() {
  const screenWidth = window.innerWidth;
  itemsPerSlide = screenWidth < 640 ? 1 : screenWidth < 768 ? 2 : screenWidth < 1024 ? 3 : 4;
}

// Navigate to the next slide
function nextSlide() {
  const totalSlides = document.querySelectorAll(".slide").length;
  currentIndex = currentIndex + itemsPerSlide < totalSlides ? currentIndex + 1 : 0;
  updateSlider();
  resetAutoSlide();
}

// Navigate to the previous slide
function prevSlide() {
  const totalSlides = document.querySelectorAll(".slide").length;
  currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - itemsPerSlide;
  updateSlider();
  resetAutoSlide();
}

// Reset the auto-slide interval
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Start the auto-slide interval
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider and responsive settings
window.addEventListener("resize", () => {
  updateItemsPerSlide();
  updateSlider();
});
updateItemsPerSlide();
startAutoSlide();

// Theme toggle button
const toggleButtons = document.querySelectorAll(".btnThem");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isDark = localStorage.theme === "dark";
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");

    document.querySelectorAll(".icon-light").forEach((icon) => {
      icon.setAttribute("href", isDark ? "#sun" : "#moon");
    });

    document.querySelectorAll(".changeName").forEach((element) => {
      element.textContent = isDark ? "تم روشن" : "تم تیره";
    });
  });
});

// Set initial theme on DOM load
window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);

  document.querySelectorAll(".icon-light").forEach((icon) => {
    icon.setAttribute("href", isDark ? "#moon" : "#sun");
  });

  document.querySelectorAll(".changeName").forEach((element) => {
    element.textContent = isDark ? "تم تیره" : "تم روشن";
  });

  // Load movies from the server
  fetch("http://localhost/proje/php/getMovie.php")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((movies) => {
      const slider = document.getElementById("slider");
      if (slider) {
        movies.forEach((movie) => {
          const slide = document.createElement("div");
          slide.className = "slide box-border xs:min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[25%] p-4";
          slide.innerHTML = `
            <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden dark:border-2 dark:border-zinc-700">
              <img src="../public/img/${movie.image_url}" alt="${movie.name}" class="w-full h-64 object-cover" />
              <div class="p-4 dark:bg-neutral-200 text-white dark:text-zinc-900">
                <h3 class="text-xl font-semibold font-iranS-Med text-left">${movie.name}</h3>
                <div class="flex justify-between items-center text-yellow-400 mt-2 dark:text-zinc-900">
                  <div class="flex gap-x-3 items-center">
                    <span class="text-sm font-thin">${movie.year}</span>
                    <span class="ml-4 px-2 py-1 rounded text-xs border border-white dark:border-black font-thin dark:hover:bg-rose-400 hover:bg-yellow-300 hover:text-black">
                      ${movie.quality}
                    </span>
                  </div>
                  <div>
                    <span class="flex items-center gap-x-2">
                      <svg class="w-5 h-5"><use href="#star"></use></svg>
                      <span class="text-sm">${movie.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          `;
          slider.appendChild(slide);
        });
      }
    })
    .catch((error) => console.error("Error loading movies:", error));
});

// Menu visibility on scroll
window.addEventListener("scroll", () => {
  const menu = document.getElementById("menus");
  if (menu) {
    menu.classList.toggle("hiddenMeno", window.scrollY > 120);
  }
});

// Toggle menu visibility
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const subMenu = document.getElementById("subMenu");
const overlay = document.getElementById("overlay");

if (menuBtn && closeMenu && subMenu && overlay) {
  menuBtn.addEventListener("click", () => {
    subMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  closeMenu.addEventListener("click", () => {
    subMenu.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}

// Display username from URL
const user = document.getElementById("user");
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");

if (username && user) {
  user.textContent = ` ${username}`;
  document.getElementById("userMenu")?.classList.remove("hidden");
}

// Logout button functionality
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
