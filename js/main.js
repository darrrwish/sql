document.addEventListener('DOMContentLoaded', function () {
  hljs.highlightAll();

  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const markdownContent = document.getElementById('markdown-content');

  // التحكم في السايدبار حسب حجم الشاشة
  function handleSidebarVisibility() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('visible');
      sidebarToggle.textContent = '☰';
      sidebarToggle.style.display = 'block';
    } else {
      sidebar.classList.add('visible');
      sidebarToggle.style.display = 'none';
    }
  }

  handleSidebarVisibility();
  window.addEventListener('resize', handleSidebarVisibility);

  // ضبط الوضع من localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.remove('dark-mode', 'light-mode'); // 👈 أضف هذا
    body.classList.add(savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } else {
    body.classList.remove('dark-mode', 'light-mode'); // 👈 أضف هذا
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // تحميل أول مقال تلقائيًا
  loadArticle('home');

  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('visible');
    sidebarToggle.innerHTML = sidebar.classList.contains('visible') ? '<i class="fa-solid fa-arrow-right"></i>' : '<i class="fa-solid fa-list-ol"></i>';
  });

  // أكورديون المطور
  const developerAccordion = document.querySelector('.developer-accordion');
  if (developerAccordion) {
    developerAccordion.querySelector('.accordion-header').addEventListener('click', function () {
      developerAccordion.classList.toggle('active');

      if (window.innerWidth <= 768) {
        sidebar.classList.remove('visible');
        sidebarToggle.innerHTML = '<i class="fa-solid fa-list-ol"></i>';
      }
    });
  }

  // مستمعات عناصر الدورة
  document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('visible');
        sidebarToggle.textContent = '☰';
      }

      document.querySelectorAll('.course-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });

      const articleName = this.getAttribute('data-article');
      loadArticle(articleName);
    });
  });

  // تحميل المقالات
  async function loadArticle(articleName) {
    try {
      const response = await fetch(`articles/${articleName}.md`);
      if (!response.ok) throw new Error('Network response was not ok');
      const markdown = await response.text();

      markdownContent.innerHTML = marked.parse(markdown, {
        langPrefix: 'language-',
        highlight: function(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      });

      document.querySelectorAll('pre code').forEach(block => {
        block.setAttribute("dir", "ltr");
        hljs.highlightElement(block);
      });

    } catch (error) {
      markdownContent.innerHTML = `
        <div class="error">
          <h2>حدث خطأ في تحميل المقال</h2>
          <p>${error.message}</p>
          <button onclick="location.reload()">إعادة المحاولة</button>
        </div>
      `;
    }
  }

  
});

