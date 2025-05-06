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
function toggleDeveloperAccordion() {
  const accordion = document.querySelector('.developer-accordion');
  accordion.classList.toggle('active');
  
  // إغلاق السايدبار على الجوال عند فتح قسم المطور
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('visible');
    document.getElementById('sidebarToggle').textContent = '☰';
  }
}

// أو يمكنك استخدام هذا الكود إذا كنت تفضل استخدام event listeners
document.addEventListener('DOMContentLoaded', function() {
  const developerAccordion = document.querySelector('.developer-accordion');
  if (developerAccordion) {
    developerAccordion.querySelector('.accordion-header').addEventListener('click', function() {
      developerAccordion.classList.toggle('active');
    });
  }
});

// في ملف main.js أو داخل وسم <script>
document.querySelectorAll('.course-item').forEach(item => {
  item.addEventListener('click', function(e) {
    // الانتقال لأعلى الصفحة بسلاسة
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // إذا كنت تحمل المحتوى بشكل ديناميكي
    setTimeout(() => {
      // كود تحميل المحتوى هنا...
      loadArticle(this.dataset.article); // مثال لدالة تحميل المحتوى
    }, 300); // تأخير بسيط لضمان الانتقال أولاً
  });
});