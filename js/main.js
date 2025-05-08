document.addEventListener('DOMContentLoaded', function () {
  hljs.highlightAll();

  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const markdownContent = document.getElementById('markdown-content');

  // إضافة حدث على اسم الموقع لتحميل home.md
  const siteName = document.getElementById('siteName'); // افترضنا أن العنصر الذي يحتوي على اسم الموقع هو #siteName
  if (siteName) {
    siteName.addEventListener('click', function (e) {
      e.preventDefault(); // منع الإجراء الافتراضي (مثلاً الرابط)
      loadArticle('home'); // تحميل المقال home.md
    });
  }

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
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  const lastArticle = localStorage.getItem('activeArticle') || 'home';
  loadArticle(lastArticle);

  // تحديد العنصر النشط في الشريط الجانبي حسب المقال المحمّل
  document.querySelectorAll('.course-item').forEach(item => {
    const articleName = item.getAttribute('data-article');

    // إزالة الكل ثم تحديد العنصر النشط فقط
    if (articleName === lastArticle) {
      document.querySelectorAll('.course-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }

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
      localStorage.setItem('activeArticle', articleName);
    });
  });

  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('visible');
    sidebarToggle.innerHTML = sidebar.classList.contains('visible')
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-database"></i>';
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
    patients: [
      { id: 1, name: 'أحمد حسن', gender: 'ذكر', dob: '1980-03-10', phone: '01012345678', address: 'الجيزة - الهرم' },
      { id: 2, name: 'مروة حسين', gender: 'أنثى', dob: '1992-09-15', phone: '01123456789', address: 'القاهرة - مدينة نصر' },
      { id: 3, name: 'مصطفى علي', gender: 'ذكر', dob: '1988-06-22', phone: '01234567890', address: 'الإسكندرية - سيدي بشر' },
      { id: 4, name: 'ليلى محمد', gender: 'أنثى', dob: '1995-01-05', phone: '01099887766', address: 'المنصورة - الجامعة' },
      { id: 5, name: 'سعيد عبد الله', gender: 'ذكر', dob: '1975-12-01', phone: '01055544433', address: 'طنطا - المحلة الكبرى' }
    ],
    diagnoses: [
      { id: 1, patient_id: 1, diagnosis: 'التهاب رئوي حاد', diagnosis_date: '2024-04-28' },
      { id: 2, patient_id: 2, diagnosis: 'ارتفاع ضغط الدم', diagnosis_date: '2024-04-30' },
      { id: 3, patient_id: 3, diagnosis: 'ارتفاع ضغط الدم', diagnosis_date: '2024-05-01' },
      { id: 4, patient_id: 4, diagnosis: 'سكري من النوع الثاني', diagnosis_date: '2024-05-03' },
      { id: 5, patient_id: 5, diagnosis: 'ارتفاع ضغط الدم', diagnosis_date: '2024-05-04' }
    ],
    doctors: [
      { id: 1, name: 'د. شريف أنور', specialty: 'باطنة', phone: '01055667788' },
      { id: 2, name: 'د. نجلاء فهمي', specialty: 'جراحة عظام', phone: '01224448899' },
      { id: 3, name: 'د. هاني مصطفى', specialty: 'صدرية', phone: '01177889900' },
      { id: 4, name: 'د. ياسمين توفيق', specialty: 'قلب', phone: '01011223344' },
      { id: 5, name: 'د. خالد عبد الله', specialty: 'باطنة', phone: '01122334455' }
    ],
    visits: [
      { id: 1, patient_id: 1, doctor_id: 3, visit_date: '2024-04-28', notes: 'سعال وارتفاع حرارة' },
      { id: 2, patient_id: 2, doctor_id: 5, visit_date: '2024-04-30', notes: 'ضغط مرتفع وصداع' },
      { id: 3, patient_id: 3, doctor_id: 5, visit_date: '2024-05-01', notes: 'دوخة وألم بالرأس' },
      { id: 4, patient_id: 4, doctor_id: 1, visit_date: '2024-05-03', notes: 'تحليل سكر' },
      { id: 5, patient_id: 5, doctor_id: 5, visit_date: '2024-05-04', notes: 'ضغط مرتفع' }
    ],
    medications: [
      { id: 1, patient_id: 1, medication: 'أموكسيسيللين', dose: '500mg/8h', start_date: '2024-04-28', end_date: '2024-05-05' },
      { id: 2, patient_id: 2, medication: 'أملوديبين', dose: '5mg/24h', start_date: '2024-04-30', end_date: null },
      { id: 3, patient_id: 3, medication: 'أملوديبين', dose: '5mg/24h', start_date: '2024-05-01', end_date: null },
      { id: 4, patient_id: 4, medication: 'ميتفورمين', dose: '850mg/12h', start_date: '2024-05-03', end_date: null },
      { id: 5, patient_id: 5, medication: 'أملوديبين', dose: '5mg/24h', start_date: '2024-05-04', end_date: null }
    ],
    departments: [
      { id: 1, name: 'باطنة' },
      { id: 2, name: 'جراحة عظام' },
      { id: 3, name: 'صدرية' },
      { id: 4, name: 'قلب' },
      { id: 5, name: 'غدد صماء' }
    ]
  };

  function createSQLRunner(codeBlock) {
    const pre = codeBlock.parentNode;
    const controls = document.createElement('div');
    controls.className = 'code-controls';
    controls.innerHTML = `
      <button class="sql-btn" title="تشغيل"><i class="fas fa-play"></i></button>
      <button class="sql-btn" title="نسخ"><i class="fas fa-copy"></i></button>
    `;

    const runBtn = controls.querySelector('.sql-btn:nth-child(1)');
    const copyBtn = controls.querySelector('.sql-btn:nth-child(2)');
    const resultDiv = document.createElement('div');
    resultDiv.className = 'sql-result';

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        const icon = copyBtn.querySelector('i');
        icon.classList.replace('fa-copy', 'fa-check');
        setTimeout(() => icon.classList.replace('fa-check', 'fa-copy'), 1500);
      });
    });

    runBtn.addEventListener('click', () => {
      const sql = codeBlock.innerText.trim();
      try {
        const tableMatch = sql.match(/from\s+[`']?(\w+)[`']?/i);
        const tableName = tableMatch ? tableMatch[1] : '';
        const data = mockData[tableName] || [];
        resultDiv.style.display = 'block';
        displayResults(data, resultDiv);
      } catch (error) {
        resultDiv.innerHTML = `<div class="sql-error">❌ خطأ: ${error.message}</div>`;
      }
    });

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
    Object.keys(data[0]).forEach(key => html += `<th>${key}</th>`);
    html += '</tr></thead><tbody>';

    data.forEach(row => {
      html += '<tr>';
      Object.values(row).forEach(value => html += `<td>${value}</td>`);
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

  // تأكد من تشغيل الـ SQL Runners
  document.addEventListener('DOMContentLoaded', initSQLRunners);


  document.getElementById('homeLogo').addEventListener('click', function() {
    // تحميل الصفحة الرئيسية
    loadArticle('home');
    
    // إزالة التنشيط من جميع العناصر الأخرى
    document.querySelectorAll('.course-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // تنشيط عنصر الصفحة الرئيسية
    document.querySelector('[data-article="home"]').classList.add('active');
    
    // التمرير إلى الأعلى
    window.scrollTo(0, 0);
  });
});
