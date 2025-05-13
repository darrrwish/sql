import { AuthService } from './auth.js';

export const ArticleManager = {
  load: async (articleName) => {
    try {
      // Check authentication and verification for non-home articles
      if (articleName !== 'home') {
        if (!AuthService.isAuthenticated()) {
          document.getElementById('markdown-content').innerHTML = `
            <div class="auth-card">
              <div class="auth-card-header">
                <h3>تسجيل الدخول مطلوب</h3>
              </div>
              <div class="auth-card-content">
                <p>الرجاء تسجيل الدخول للاطلاع على المحتوى.</p>
                <button class="btn btn-primary" onclick="document.getElementById('loginModal').style.display='flex'">تسجيل الدخول</button>
              </div>
            </div>
          `;
          return;
        }
        if (!AuthService.isVerified()) {
          document.getElementById('markdown-content').innerHTML = `
            <div class="auth-card">
              <div class="auth-card-header">
                <h3>تفعيل الحساب مطلوب</h3>
              </div>
              <div class="auth-card-content">
                <p>حسابك غير مفعل. تحقق من بريدك الإلكتروني لتفعيل الحساب.</p>
                <button class="btn btn-primary" onclick="document.getElementById('loginModal').style.display='flex'">العودة إلى تسجيل الدخول</button>
              </div>
            </div>
          `;
          return;
        }
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