const faqData = [
    { question: "آیا اطلاعات داده شده درست می‌باشد؟", answer: "بله" },
    { question: "راه ارتباطی با ما چگونه است؟", answer: "تماس با: 137" },
    {
      question: "برای ارتباط بیشتر باید چکار کنم؟",
      answer: '<a href="https://qom.ir/site/contact" target="_blank" class="text-blue-500 underline">اینجا کلیک کنید</a>',
    },
  ];
  
  const faqContainer = document.getElementById("faq-container");
  
  faqData.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className =
      "mb-2 bg-gradient-to-r from-neutral-100 to-neutral-300 dark:from-zinc-600 dark:to-zinc-900 rounded-lg";
    questionDiv.innerHTML = `
      <div class="cursor-pointer p-3 border text-zinc-900 text-center tracking-tighter font-bold leading-tight rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600" onclick="toggleFAQ(${index})">
        ${item.question}
      </div>
      <div id="answer-${index}" class="hidden mt-2 p-3 border text-neutral-50 bg-gray-400 dark:bg-gray-600 text-center tracking-tighter font-bold leading-tight rounded-lg">
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
  