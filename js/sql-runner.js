// sql-runner.js
import { mockData } from './mock-data.js';

export const SQLRunner = {
  init: () => {
    document.querySelectorAll('pre code.language-sql').forEach(sqlBlock => {
      SQLRunner.create(sqlBlock);
    });
    
    // إعادة تهيئة عند تغيير المحتوى
    const observer = new MutationObserver(() => {
      document.querySelectorAll('pre code.language-sql').forEach(sqlBlock => {
        if (!sqlBlock.parentNode.querySelector('.code-controls')) {
          SQLRunner.create(sqlBlock);
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },
  
  create: (codeBlock) => {
    const pre = codeBlock.parentNode;
    
    // تجنب إنشاء عناصر تحكم مكررة
    if (pre.querySelector('.code-controls')) return;
    
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
    
    copyBtn.addEventListener('click', () => SQLRunner.copyCode(codeBlock, copyBtn));
    runBtn.addEventListener('click', () => SQLRunner.runCode(codeBlock, resultDiv));
    
    pre.style.position = 'relative';
    pre.appendChild(controls);
    pre.parentNode.insertBefore(resultDiv, pre.nextSibling);
  },
  
  copyCode: (codeBlock, copyBtn) => {
    navigator.clipboard.writeText(codeBlock.innerText).then(() => {
      const icon = copyBtn.querySelector('i');
      icon.classList.replace('fa-copy', 'fa-check');
      setTimeout(() => icon.classList.replace('fa-check', 'fa-copy'), 1500);
    });
  },
  
  runCode: (codeBlock, resultDiv) => {
    try {
      // مسح الجداول القديمة أولاً
      alasql('DROP TABLE IF EXISTS patients');
      alasql('DROP TABLE IF EXISTS diagnoses');
      alasql('DROP TABLE IF EXISTS doctors');
      alasql('DROP TABLE IF EXISTS visits');
      alasql('DROP TABLE IF EXISTS medications');
      alasql('DROP TABLE IF EXISTS departments');
      
      // إنشاء الجداول وإدراج البيانات
      alasql('CREATE TABLE patients');
      alasql.tables.patients.data = mockData.patients;
      
      alasql('CREATE TABLE diagnoses');
      alasql.tables.diagnoses.data = mockData.diagnoses;
      
      alasql('CREATE TABLE doctors');
      alasql.tables.doctors.data = mockData.doctors;
      
      alasql('CREATE TABLE visits');
      alasql.tables.visits.data = mockData.visits;
      
      alasql('CREATE TABLE medications');
      alasql.tables.medications.data = mockData.medications;
      
      alasql('CREATE TABLE departments');
      alasql.tables.departments.data = mockData.departments;
      
      // تنفيذ الاستعلام
      const results = alasql(codeBlock.innerText.trim());
      resultDiv.style.display = 'block';
      SQLRunner.displayResults(results, resultDiv);
    } catch (error) {
      resultDiv.innerHTML = `<div class="sql-error">❌ خطأ: ${error.message}</div>`;
      resultDiv.style.display = 'block';
    }
  },
  
  displayResults: (data, container) => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      container.innerHTML = '<div class="sql-message">لا توجد نتائج</div>';
      return;
    }
    
    // إذا كانت النتيجة رقم (مثل COUNT)
    if (typeof data === 'number') {
      container.innerHTML = `<div class="sql-result-value">النتيجة: ${data}</div>`;
      return;
    }
    
    // إذا كانت النتيجة مصفوفة
    let html = '<table class="sql-table"><thead><tr>';
    Object.keys(data[0]).forEach(key => html += `<th>${key}</th>`);
    html += '</tr></thead><tbody>';
    
    data.forEach(row => {
      html += '<tr>';
      Object.values(row).forEach(value => {
        html += `<td>${value === null ? 'NULL' : value}</td>`;
      });
      html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  }
};