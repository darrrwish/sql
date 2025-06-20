import { AuthService } from './auth.js';
import { EventHandlers } from './event-handlers.js';
import { initVideoPlayers } from './main.js';

export const ArticleManager = {
  load: async (articleName) => {
    const contentDiv = document.getElementById('markdown-content');
    if (!contentDiv) {
      console.error('Content div not found');
      return;
    }

    try {
      // Check authentication and verification for non-home articles
      if (articleName !== 'home') {
        if (!AuthService.isAuthenticated()) {
          contentDiv.innerHTML = `
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
          contentDiv.innerHTML = `
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

      // Check if marked library is loaded
      if (typeof marked === 'undefined') {
        throw new Error('Marked library is not loaded');
      }

      // Check if hljs is loaded
      if (typeof hljs === 'undefined') {
        throw new Error('Highlight.js library is not loaded');
      }

      // Load article content
      const response = await fetch(`articles/${articleName}.md`);
      if (!response.ok) {
        throw new Error(`Failed to load article: ${response.status}`);
      }

      const markdown = await response.text();
      contentDiv.innerHTML = marked.parse(markdown, {
        langPrefix: 'language-',
        highlight: (code, lang) => {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      });

      initVideoPlayers(); // لتفعيل الفيديوهات في المقال الجديد
      await EventHandlers.updateProgress(articleName);


      // Apply syntax highlighting and direction to code blocks
      document.querySelectorAll('pre code').forEach(block => {
        block.setAttribute('dir', 'ltr');
        hljs.highlightElement(block);
      });

      // Add complete lesson button for authenticated users (excluding home, roadmap, and contents)
      if (AuthService.isAuthenticated() && AuthService.isVerified() && 
          articleName !== 'home' && articleName !== 'road-map' && articleName !== 'content') {
        const completeButton = document.createElement('button');
        completeButton.className = 'complete-lesson-btn';
        completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completeButton.title = 'إكمال الدرس';
        completeButton.type = 'button';

        // Check if article is already completed
        const user = AuthService.getCurrentUser();
        if (user) {
          try {
            const progressData = await AuthService.getProgress(user.id);
            if (progressData.success && progressData.completedArticles.includes(articleName)) {
              completeButton.disabled = true;
              completeButton.style.opacity = '0.5';
            }
          } catch (error) {
            console.error('Error checking progress:', error);
          }
        }

        // Add event listener for marking article as complete
        completeButton.addEventListener('click', async () => {
          try {
            const result = await EventHandlers.markArticleComplete(articleName);
            if (result.success) {
              completeButton.disabled = true;
              completeButton.style.opacity = '0.5';
              // Add success message without rewriting the entire contentDiv
              const successMessage = document.createElement('div');
              successMessage.className = 'alert alert-success';
              successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم تسجيل إكمال الدرس بنجاح!';
              contentDiv.appendChild(successMessage);
              // Reinitialize SQLRunner to ensure code blocks are still functional
              import('./sql-runner.js').then(({ SQLRunner }) => {
                SQLRunner.init();
              });
              console.log(`Article ${articleName} marked as complete`);
            } else {
              throw new Error(result.message || 'فشل في تسجيل إكمال الدرس');
            }
          } catch (error) {
            console.error('Error marking article complete:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger';
            errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message || 'فشل في تسجيل إكمال الدرس. حاول مرة أخرى.'}`;
            contentDiv.appendChild(errorMessage);
          }
        });

        contentDiv.appendChild(completeButton);
      }

    } catch (error) {
      console.error('Error loading article:', error);
      contentDiv.innerHTML = `
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