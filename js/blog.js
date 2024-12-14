
const blogData = {
  categories: ["اکشن", "درام", "کمدی", "علمی-تخیلی", "ماجراجویی"],
  articles: [
    {
      title: "انتقام‌جویان: پایان بازی",
      category: "اکشن",
      poster: "../public/img/blog/b1.jpg",
      excerpt: "داستان پایانی تیم انتقام‌جویان در مقابله با تانوس.",
      rating: "8.4",
      genres: ["اکشن", "ماجراجویی", "علمی-تخیلی"],
      link: "#",
    },
    {
      title: "در جستجوی خوشبختی",
      category: "درام",
      poster: "../public/img/blog/b2.jpg",
      excerpt: "سفر پدر و پسر برای یافتن امید و موفقیت.",
      rating: "8.0",
      genres: ["درام", "زندگی‌نامه"],
      link: "#",
    },
    {
      title: "جوکر",
      category: "درام",
      poster: "../public/img/blog/b3.jpg",
      excerpt: "سفر آرثر فلک به تبدیل شدن به جوکر.",
      rating: "8.5",
      genres: ["درام", "هیجان‌انگیز"],
      link: "#",
    },
    {
      title: "نگهبانان کهکشان",
      category: "کمدی",
       poster: "../public/img/blog/b4.jpg",
      excerpt: "ماجراجویی گروهی از موجودات عجیب و غریب در فضا.",
      rating: "8.0",
      genres: ["کمدی", "ماجراجویی", "علمی-تخیلی"],
      link: "#",
    },
    {
      title: "بین ستارگان",
      category: "علمی-تخیلی",
       poster: "../public/img/blog/b6.jpg",
      excerpt: "سفر به کهکشان‌های دور برای نجات بشریت.",
      rating: "8.6",
      genres: ["علمی-تخیلی", "درام", "ماجراجویی"],
      link: "#",
    },
  ],
};

// افزودن دسته‌بندی‌ها
function loadCategories() {
  const categoriesContainer = document.getElementById("categoriesContainer");
  blogData.categories.forEach((category) => {
    const categoryButton = document.createElement("button");
    categoryButton.className =
      "p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600";
    categoryButton.textContent = category;
    categoryButton.onclick = () => filterArticlesByCategory(category);
    categoriesContainer.appendChild(categoryButton);
  });
}

// افزودن مقالات
function loadArticles(articles = blogData.articles) {
  const articlesContainer = document.getElementById("articlesContainer");
  articlesContainer.innerHTML = ""; // پاک کردن مقالات قبلی

  articles.forEach((article) => {
    const articleCard = document.createElement("div");
    articleCard.className =
      "p-4 border rounded-lg shadow-md dark:bg-white shadow bg-gray-700 dark:border-2 dark:border-zinc-700 shadow-slate-700  border-zinc-700 border-2 dark:border-zinc-800 dark:shadow-gray-900 flex flex-col";
    articleCard.innerHTML = `
      <img src="${article.poster}" alt="${article.title}" class="rounded-lg mb-4 w-[384px] h-[242px]">
      <h3 class="text-lg font-bold dark:text-gray-800 text-zinc-100 font-iran-black tracking-wider">
        ${article.title}
      </h3>
      <p class="text-sm dark:text-gray-600 text-neutral-200 mb-2">
        ${article.excerpt}
      </p>
      <p class="text-sm font-iranS-B dark:text-gray-500 text-neutral-300 tracking-wider mb-2">
        ژانر: ${article.genres.join(", ")}
      </p>
      <p class="text-sm text-yellow-500 font-bold mb-4">
        امتیاز: ${article.rating}
      </p>
      <a href="${article.link}" class="text-blue-500 hover:underline mt-auto">مطالعه بیشتر</a>
    `;
    articlesContainer.appendChild(articleCard);
  });
}

// فیلتر کردن مقالات بر اساس دسته‌بندی
function filterArticlesByCategory(category) {
  const filteredArticles = blogData.articles.filter(
    (article) => article.category === category
  );
  loadArticles(filteredArticles);
}

// جستجوی مقالات
function searchArticles() {
  const searchInput = document.getElementById("searchInput").value;
  const filteredArticles = blogData.articles.filter((article) =>
    article.title.includes(searchInput)
  );
  loadArticles(filteredArticles);
}

// بارگذاری اولیه
loadCategories();
loadArticles();
