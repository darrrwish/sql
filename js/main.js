document.addEventListener('DOMContentLoaded', function () {
  hljs.highlightAll();

  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const markdownContent = document.getElementById('markdown-content');

  function handleSidebarVisibility() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('visible');
      sidebarToggle.innerHTML = '<i class="fa-solid fa-database"></i>';
      sidebarToggle.style.display = 'block';
    } else {
      sidebar.classList.add('visible');
      sidebarToggle.style.display = 'none';
    }
  }

  handleSidebarVisibility();
  window.addEventListener('resize', handleSidebarVisibility);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } else {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

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
    sidebarToggle.innerHTML = sidebar.classList.contains('visible') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-database"></i>';
  });

  document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('visible');
        sidebarToggle.innerHTML = '<i class="fa-solid fa-database"></i>';
      }

      document.querySelectorAll('.course-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });

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
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      });

      document.querySelectorAll('pre code').forEach(block => {
        block.setAttribute("dir", "ltr");
        hljs.highlightElement(block);
      });

      initSQLRunners();

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

  const mockData = {
    users: [
      { id: 1, name: 'أحمد', email: 'ahmed@example.com' },
      { id: 2, name: 'محمد', email: 'mohamed@example.com' },
      { id: 3, name: 'علي', email: 'ali@example.com' }
    ],
    products: [
      { id: 1, name: 'لابتوب', price: 1500 },
      { id: 2, name: 'هاتف', price: 800 }
    ]
  };

  function createSQLRunner(codeBlock) {
    const pre = codeBlock.parentNode;

    // أزرار التشغيل والنسخ داخل <pre>
    const controls = document.createElement('div');
    controls.className = 'code-controls';
    controls.innerHTML = `
      <button class="sql-btn" title="تشغيل"><i class="fas fa-play"></i></button>
      <button class="sql-btn" title="نسخ"><i class="fas fa-copy"></i></button>
    `;

    const runBtn = controls.querySelectorAll('.sql-btn')[0];
    const copyBtn = controls.querySelectorAll('.sql-btn')[1];

    // نتيجة التشغيل خارج <pre>
    const resultDiv = document.createElement('div');
    resultDiv.className = 'sql-result';

    // نسخ الكود
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        const icon = copyBtn.querySelector('i');
        icon.classList.replace('fa-copy', 'fa-check');
        setTimeout(() => icon.classList.replace('fa-check', 'fa-copy'), 1500);
      });
    });

    // تشغيل الكود
    runBtn.addEventListener('click', () => {
      const sql = codeBlock.innerText.trim();
      try {
        const tableMatch = sql.match(/from\s+[`']?(\w+)[`']?/i);
        const tableName = tableMatch ? tableMatch[1] : '';
        const data = mockData[tableName] || [];
        resultDiv.style.display = 'block'; // ✅ إظهار النتيجة
displayResults(data, resultDiv);
      } catch (error) {
        resultDiv.innerHTML = `<div class="sql-error">❌ خطأ: ${error.message}</div>`;
      }
    });

    // إدراج الأزرار داخل <pre>
    pre.style.position = 'relative';
    pre.appendChild(controls);
    pre.parentNode.insertBefore(resultDiv, pre.nextSibling);
  }

  function displayResults(data, container) {
    if (!data.length) {
      container.innerHTML = '<div class="sql-message">لا توجد نتائج</div>';
      return;
    }

    let html = '<table class="sql-table"><thead><tr>';
    Object.keys(data[0]).forEach(key => {
      html += `<th>${key}</th>`;
    });
    html += '</tr></thead><tbody>';

    data.forEach(row => {
      html += '<tr>';
      Object.values(row).forEach(value => {
        html += `<td>${value}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function initSQLRunners() {
    document.querySelectorAll('pre code.language-sql').forEach(sqlBlock => {
      createSQLRunner(sqlBlock);
    });
  }

  document.addEventListener('DOMContentLoaded', initSQLRunners);
});
