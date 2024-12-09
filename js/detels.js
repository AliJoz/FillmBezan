
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

  createCommentBtn.addEventListener('click', () => {
    commentFormContainer.classList.toggle('hidden');
    createCommentBtn.classList.toggle('hidden');
  });


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
 


  submitCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText === '') {
      modal.classList.remove("hidden");
      closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
      modolP.innerHTML="لطفا جای نظر خالی نباشد."
    
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.classList.add("hidden");
        }
      });
      
      return;
    }
    const commentElement = document.createElement('div');
    commentElement.classList.add('p-4', 'border', 'border-gray-300', 'rounded-md', 'mb-4','pb-12',);
    commentElement.innerHTML = `
    <p class="font-medium dark:text-zinc-800">${commentText}</p>
    <p class="text-yellow-500 mt-2">${'⭐️'.repeat(selectedRating)}</p>
    <p class="text-gray-500 text-sm mt-2">توسط: ${currentUsername}</p>
    `;
    
    commentsList.appendChild(commentElement);

    

    // clear from  
    commentInput.value = '';
    updateStars(0); 
    commentFormContainer.classList.add('hidden');
    createCommentBtn.classList.remove('hidden');
  });
});



