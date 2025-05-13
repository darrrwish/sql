import { AuthService } from './auth.js';

export const ArticleManager = {
  load: async (articleName) => {
    try {
      // Check authentication for non-home articles
      if (articleName !== 'home' && !AuthService.isAuthenticated()) {
        document.getElementById('markdown-content').innerHTML = `
          <div class="alert alert-warning">
            <h3>الرجاء تسجيل الدخول أولاً للاطلاع على المحتوى</h3>
            <button class="btn btn-primary" onclick="document.getElementById('loginModal').style.display='flex'">تسجيل الدخول</button>
          </div>
        `;
        return;
      }

      const response = await fetch(`articles/${articleName}.md`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const markdown = await response.text();
      document.getElementById('markdown-content').innerHTML = marked.parse(markdown, {
        langPrefix: 'language-',
        highlight: (code, lang) => {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      });
      
      document.querySelectorAll('pre code').forEach(block => {
        block.setAttribute("dir", "ltr");
        hljs.highlightElement(block);
      });
      
    } catch (error) {
      document.getElementById('markdown-content').innerHTML = `
        <div class="error">
          <h2>حدث خطأ في تحميل المقال</h2>
          <p>${error.message}</p>
          <button onclick="location.reload()">إعادة المحاولة</button>
        </div>
      `;
    }
  },
  
  setActive: (articleName) => {
    document.querySelectorAll('.course-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-article') === articleName);
    });
    localStorage.setItem('activeArticle', articleName);
  }
};