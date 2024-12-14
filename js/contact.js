const faqData = [
    { question: "چگونه با پشتیبانی تماس بگیرم؟", answer: "ما می‌توانید از طریق فرم تماس، شماره تماس، یا ایمیل با ما در ارتباط باشید." },
    { question: "ساعات کاری شما چگونه است؟", answer: "ساعات کاری ما از شنبه تا پنجشنبه، از ساعت ۹ صبح تا ۶ عصر است. " },
    {
      question: "آیا اطلاعات من محرمانه می‌ماند؟",
      answer: 'بله، تمامی اطلاعات شما نزد ما محفوظ است و تنها برای مقاصد ارتباطی استفاده می‌شود.',
    },
    {
        question: "آیا میتونم فیلم های بیشتری ببینم؟",
        answer: '<a href="../html/index.html" target="_blank" class="text-zinc-50 underline">اینجا کلیک کنید</a>',
      },
  ];
  
  const faqContainer = document.getElementById("faq-container");
  
  faqData.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className =
      "mb-2 bg-gradient-to-r dark:from-neutral-100 dark:to-neutral-300 from-zinc-600 to-zinc-900 rounded-lg";
    questionDiv.innerHTML = `
      <div class="cursor-pointer p-3 border dark:text-zinc-900 text-center tracking-tighter font-bold leading-tight rounded-lg bg-gray-200 hover:bg-gray-400 dark:bg-zinc-200 dark:hover:bg-orange-300" onclick="toggleFAQ(${index})">
        ${item.question}
      </div>
      <div id="answer-${index}" class="hidden mt-2 p-3 border text-neutral-50 bg-gray-500 dark:bg-orange-200 dark:text-zinc-800 text-center tracking-tighter font-bold leading-tight rounded-lg">
        ${item.answer}
      </div>
    `;
    faqContainer.appendChild(questionDiv);
  });
  
  function toggleFAQ(index) {
    const answer = document.getElementById(`answer-${index}`);
    if (answer.classList.contains("hidden")) {
      answer.classList.remove("hidden");
    } else {
      answer.classList.add("hidden");
    }
  }
  