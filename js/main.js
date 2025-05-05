document.addEventListener('DOMContentLoaded', function () {
  hljs.highlightAll(); // تفعيل تلوين الكود أول مرة

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
  themeToggle.textContent = savedTheme === 'dark-mode' ? '🌞' : '🌙';
} else {
  // إذا لم يكن هناك وضع محفوظ، افتراضيًا وضع ليلي
  body.classList.add('dark-mode');
  themeToggle.textContent = '🌞';
}



  // تحميل أول مقال تلقائيًا
  loadArticle('home');

  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark-mode' ? '🌞' : '🌙';
  });

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('visible');
    sidebarToggle.textContent = sidebar.classList.contains('visible') ? '✕' : '☰';
  });

  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('visible');
        sidebarToggle.textContent = '☰';
      }

      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      loadArticle(this.getAttribute('data-article'));
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
window.addEventListener('resize', function() {
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('visible');
    sidebarToggle.textContent = '☰';
  } else {
    sidebar.classList.add('visible');
    sidebarToggle.textContent = '✕';
  }
});