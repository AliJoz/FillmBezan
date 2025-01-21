document.addEventListener('DOMContentLoaded', () => {
  const createCommentBtn = document.getElementById('createComment');
  const commentFormContainer = document.getElementById('commentFormContainer');
  const submitCommentBtn = document.getElementById('submitComment');
  const commentsList = document.getElementById('commentsList');
  const commentInput = document.getElementById('commentInput');
  const stars = document.querySelectorAll('.star');
  const modal = document.getElementById("modal");
  const modolP = document.getElementById("modolP");
  const closeModalBtn = document.getElementById("closeModal");
  
  let selectedRating = 5;
  const currentUsername = "AliReza";

  // Toggle comment form visibility
  createCommentBtn.addEventListener('click', () => {
    commentFormContainer.classList.toggle('hidden');
    createCommentBtn.classList.toggle('hidden');
  });

  // Handle star rating selection
  stars.forEach((star) => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      updateStars(selectedRating);
    });
  });

  function updateStars(rating) {
    stars.forEach((star) => {
      const value = parseInt(star.getAttribute('data-value'));
      if (value <= rating) {
        star.classList.add('text-yellow-400');
        star.classList.remove('text-gray-400');
      } else {
        star.classList.add('text-gray-400');
        star.classList.remove('text-yellow-400');
      }
    });
  }

  // Handle comment submission
  submitCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText === '') {
      modal.classList.remove("hidden");
      closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
      modolP.innerHTML = "لطفا جای نظر خالی نباشد.";
      modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.classList.add("hidden");
      });
      return;
    }

    const commentElement = document.createElement('div');
    commentElement.classList.add('p-4', 'border', 'border-gray-300', 'rounded-md', 'mb-4', 'pb-12');
    commentElement.innerHTML = `
      <p class="font-medium dark:text-zinc-800">${commentText}</p>
      <p class="text-yellow-500 mt-2">${'⭐️'.repeat(selectedRating)}</p>
      <p class="text-gray-500 text-sm mt-2">توسط: ${currentUsername}</p>
    `;
    
    commentsList.appendChild(commentElement);

    // Clear form
    commentInput.value = '';
    updateStars(0); 
    commentFormContainer.classList.add('hidden');
    createCommentBtn.classList.remove('hidden');
  });

  // Fetch movie details
  function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    fetch(`http://localhost/proje/php/getMovie.php?id=${movieId}`)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then((movieData) => {
            if (movieData) {
                updateMovieDetails(movieData);
            } else {
                console.error("No movie data found.");
            }
        })
        .catch((error) => console.error("Error fetching movie details:", error));
  }

  // Update movie details on the page
  function updateMovieDetails(movieData) {
    const movieImage = document.querySelector('.imgs');
    if (movieImage) {
      movieImage.src = `../public/img/${movieData.image_url}`;
      movieImage.alt = movieData.name || "Movie Poster";
    }

    const titleElement = document.querySelector("h2");
    if (titleElement) titleElement.textContent = movieData.name || "نام فیلم";

    const descriptionElement = document.querySelector("p.text-gray-400");
    if (descriptionElement) descriptionElement.textContent = movieData.description || "توضیحاتی برای این فیلم موجود نیست.";

    const teaserButton = document.querySelector("button");
    if (teaserButton && teaserButton.textContent.includes('تیزر')) {
      teaserButton.addEventListener("click", () => {
        if (movieData.trailer_url) {
          window.open(movieData.trailer_url, "_blank");
        } else {
          alert("تیزری برای این فیلم موجود نیست.");
        }
      });
    }

    const downloadMenu = document.querySelector(".group-hover\\:block ul");
    if (downloadMenu) {
      const qualities = ["4K", "1080p", "720p", "480p"];
      downloadMenu.innerHTML = "";
      qualities.forEach((quality) => {
        const li = document.createElement("li");
        li.textContent = quality;
        li.className = "borderHover";
        li.addEventListener("click", () => {
          alert(`در حال دانلود کیفیت ${quality}`);
        });
        downloadMenu.appendChild(li);
      });
    }

    const ratingElement = document.querySelector(".text-gray-400.dark\\:text-zinc-800");
    if (ratingElement) ratingElement.textContent = movieData.rating || "0.0";

    const ratingBar = document.querySelector(".bg-orange-500.dark\\:bg-zinc-400");
    if (ratingBar) {
      const ratingPercent = Math.min((movieData.rating / 10) * 100, 100);
      ratingBar.style.width = `${ratingPercent}%`;
    }
  }

  // Fetch movie details on page load
  fetchMovieDetails();
});
