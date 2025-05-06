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

// أضف هذا الكود بعد تحميل DOM
document.querySelectorAll('.sidebar-title').forEach(title => {
  title.addEventListener('click', function() {
    this.classList.toggle('collapsed');
    const list = this.nextElementSibling;
    list.classList.toggle('expanded');
  });
  
  // إغلاق القوائم افتراضيًا على الجوال
  if (window.innerWidth <= 768) {
    title.classList.add('collapsed');
    title.nextElementSibling.classList.remove('expanded');
  }
});

// تحميل المقالات
function loadArticle(articleName) {
  // ... الكود الحالي ...
}

// التحكم في السايدبار على الجوال
function handleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('visible');
    sidebarToggle.style.display = 'block';
  } else {
    sidebar.classList.add('visible');
    sidebarToggle.style.display = 'none';
  }
}

// أحداث النقر على عناصر الدورة
document.querySelectorAll('.course-item').forEach(item => {
  item.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('visible');
    }
    
    document.querySelectorAll('.course-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    loadArticle(this.getAttribute('data-article'));
  });
});

// تهيئة أولية
document.addEventListener('DOMContentLoaded', function() {
  handleSidebar();
  window.addEventListener('resize', handleSidebar);
  
  // تحميل المقال الأول تلقائياً
  const firstItem = document.querySelector('.course-item');
  if (firstItem) {
    firstItem.click();
  }
});

// للخيار 2 (القابل للطي)
const accordion = document.querySelector('.developer-accordion');
if (accordion) {
  accordion.addEventListener('click', function() {
    this.classList.toggle('active');
  });
}
document.addEventListener('DOMContentLoaded', function() {
  // ... الكود الحالي ...
  
  // ضبط الوضع من localStorage
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('themeToggle');
  
  if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
  } else {
    // الوضع الافتراضي
    body.classList.add('dark-mode');
    updateThemeIcon('dark-mode');
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    
    updateThemeIcon(currentTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark-mode') {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }
  
  // ... بقية الكود ...
});