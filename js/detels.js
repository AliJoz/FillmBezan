document.addEventListener('DOMContentLoaded', () => {
    const createCommentBtn = document.getElementById('createComment');
    const commentFormContainer = document.getElementById('commentFormContainer');
    const submitCommentBtn = document.getElementById('submitComment');
    const commentsList = document.getElementById('commentsList');
    const commentInput = document.getElementById('commentInput');
    const ratingInput = document.getElementById('ratingInput');
  
    // نمایش فرم نظر
    createCommentBtn.addEventListener('click', () => {
      commentFormContainer.classList.toggle('hidden');
      createCommentBtn.classList.toggle('hidden');
    });
  
    // ارسال نظر
    submitCommentBtn.addEventListener('click', () => {
      const commentText = commentInput.value.trim();
      const rating = ratingInput.value;
  
      if (commentText === '') {
        alert('لطفاً نظر خود را وارد کنید!');
        return;
      }
  
      // ایجاد عنصر جدید برای نظر
      const commentElement = document.createElement('div');
      commentElement.classList.add('p-4', 'border', 'border-gray-300', 'rounded-md', 'mb-4');
      commentElement.innerHTML = `
        <p class="font-medium">${commentText}</p>
        <p class="text-yellow-500 mt-2">${'⭐️'.repeat(rating)}</p>
      `;
  
      // اضافه کردن نظر به لیست
      commentsList.appendChild(commentElement);
  
      // پاک کردن فرم و بستن آن
      commentInput.value = '';
      ratingInput.value = '5';
      commentFormContainer.classList.add('hidden');
      createCommentBtn.classList.remove('hidden');
    });
  });
  