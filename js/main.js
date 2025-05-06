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

  // تنفيذ عند التحميل
  handleSidebarVisibility();

  // تنفيذ عند تغيير حجم النافذة
  window.addEventListener('resize', handleSidebarVisibility);

  // ضبط الوضع من localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } else {
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
    sidebarToggle.textContent = sidebar.classList.contains('visible') ? '✕' : '☰';
  });

  // إضافة مستمع الأحداث لعناصر الدورة التعليمية
  document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('visible');
        sidebarToggle.textContent = '☰';
      }

      // إزالة الفئة النشطة من جميع العناصر
      document.querySelectorAll('.course-item').forEach(i => i.classList.remove('active'));
      
      // إضافة الفئة النشطة للعنصر المحدد
      this.classList.add('active');
      
      // تحميل المقال المطلوب
      const articleName = this.getAttribute('data-article');
      loadArticle(articleName);
    });
  });

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

// تغيير لون القلب عند النقر (نسخة معدلة)
document.addEventListener('DOMContentLoaded', function() {
  const heart = document.getElementById('heart');
  
  if (heart) {
    // دالة لتغيير اللون
    const toggleHeartColor = () => {
      heart.classList.toggle('purple');
      localStorage.setItem('heartPurple', heart.classList.contains('purple'));
    };

    // حدث النقر
    heart.addEventListener('click', toggleHeartColor);
    
    // استعادة الحالة عند التحميل
    if (localStorage.getItem('heartPurple') === 'true') {
      heart.classList.add('purple');
    }
    
    // إصلاح مشكلة عدم الاستجابة أحياناً
    heart.style.pointerEvents = 'auto';
  } else {
    console.error("Element with ID 'heart' not found!");
  }
});

