import { AuthService, AuthUI } from './auth.js';
import { ArticleManager } from './article.js';
import { SidebarManager } from './sidebar.js';

export const EventHandlers = {
  isSubmitting: false,

  handleLogin: async function(e) {
    e.preventDefault();
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (!loginEmail || !loginPassword) {
      console.error('Login form elements not found');
      return;
    }

    const identifier = loginEmail.value.trim();
    const password = loginPassword.value;
    
    const result = await AuthService.login(identifier, password);
    if (result.success) {
      AuthUI.loginModal.style.display = 'none';
      this.updateAuthUI();
      ArticleManager.load('home');
      await this.updateProgress('home');
    } else {
      AuthUI.loginError.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${result.message}`;
      AuthUI.loginError.style.display = 'block';
    }
  },

  handleRegister: async function(e) {
    e.preventDefault();
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const regUsername = document.getElementById('regUsername');
    const regEmail = document.getElementById('regEmail');
    const phoneInput = document.getElementById('phone');
    const regPassword = document.getElementById('regPassword');
    const regName = document.getElementById('regName');
    
    if (!regUsername || !regEmail || !phoneInput || !regPassword || !regName) {
      console.error('Register form elements not found');
      this.isSubmitting = false;
      return;
    }

    const username = regUsername.value.trim();
    const email = regEmail.value.trim();
    const phone = phoneInput.value.trim();
    const password = regPassword.value;
    const name = regName.value.trim();
    
    if (password.length < 8) {
      AuthUI.registerError.innerHTML = `<i class="fas fa-exclamation-circle"></i> كلمة المرور يجب أن تكون 8 أحرف على الأقل`;
      AuthUI.registerError.style.display = 'block';
      this.isSubmitting = false;
      return;
    }
    
    const result = await AuthService.register(username, email, phone, password, name);
    if (result.success) {
      AuthUI.registerModal.style.display = 'none';
      alert(`<i class="fas fa-check-circle"></i> ${result.message}`);
      AuthUI.loginModal.style.display = 'flex';
    } else {
      AuthUI.registerError.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${result.message}`;
      AuthUI.registerError.style.display = 'block';
      setTimeout(() => {
        AuthUI.registerError.style.display = 'none';
        AuthUI.registerError.textContent = '';
        this.isSubmitting = false;
      }, 5000);
    }
  },

  handleArticleClick: async function() {
    if (window.innerWidth <= 768) {
      SidebarManager.handleVisibility();
    }
    
    const articleName = this.getAttribute('data-article');
    if (!articleName) {
      console.error('Article name not found on element');
      return;
    }
    
    ArticleManager.setActive(articleName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ArticleManager.load(articleName);
    await this.updateProgress(articleName);
  },

  handleHomeClick: function() {
    ArticleManager.load('home');
    ArticleManager.setActive('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  updateAuthUI: function() {
    const loginToggle = document.getElementById('loginToggle');
    if (!loginToggle) {
      console.error('Login toggle element not found');
      return;
    }
    
    if (AuthService.isAuthenticated()) {
      const user = AuthService.getCurrentUser();
      loginToggle.innerHTML = `<i class="fas fa-user-check"></i>`;
      loginToggle.onclick = this.showUserInfo.bind(this);
    } else {
      loginToggle.innerHTML = `<i class="fas fa-user"></i>`;
      loginToggle.onclick = () => {
        AuthUI.loginModal.style.display = 'flex';
      };
    }
  },

  showUserInfo: async function() {
    const user = AuthService.getCurrentUser();
    const infoUsername = document.getElementById('infoUsername');
    const infoName = document.getElementById('infoName');
    const infoEmail = document.getElementById('infoEmail');
    const infoPhone = document.getElementById('infoPhone');
    const infoVerificationStatus = document.getElementById('infoVerificationStatus');
    const infoProgress = document.getElementById('infoProgress');
    const userInfoModal = document.getElementById('userInfoModal');
    
    // تحقق من وجود العناصر قبل المتابعة
    if (!userInfoModal) {
      console.error('User info modal not found');
      return;
    }

    // تحقق من كل عنصر على حدة
    if (infoUsername) infoUsername.textContent = user?.username || 'غير محدد';
    if (infoName) infoName.textContent = user?.name || 'غير محدد';
    if (infoEmail) infoEmail.textContent = user?.email || 'غير محدد';
    if (infoPhone) infoPhone.textContent = user?.phone || 'غير محدد';
    
    if (infoVerificationStatus) {
      infoVerificationStatus.innerHTML = user?.verified
        ? '<i class="fas fa-check-circle"></i> الحساب مفعل'
        : '<i class="fas fa-exclamation-circle"></i> الحساب غير مفعل. تحقق من بريدك الإلكتروني لتفعيله.';
      infoVerificationStatus.className = user?.verified ? 'alert alert-success' : 'alert alert-warning';
    }

    if (infoProgress) {
      const progressData = await this.getProgress(user.id);
      const totalArticles = document.querySelectorAll('.course-item').length - 2;
      const completedArticles = progressData.success ? progressData.completedArticles.length : 0;
      const progressPercent = Math.round((completedArticles / totalArticles) * 100);
      infoProgress.innerHTML = `
        <div class="progress-bar">
          <div class="progress" style="width: ${progressPercent}%"></div>
        </div>
        <span>${completedArticles} من ${totalArticles} درسًا مكتملًا (${progressPercent}%)</span>
      `;
    }

    userInfoModal.style.display = 'flex';
  },

  handleLogout: function() {
    AuthService.logout();
    const userInfoModal = document.getElementById('userInfoModal');
    if (userInfoModal) {
      userInfoModal.style.display = 'none';
    }
    this.updateAuthUI();
    location.reload();
  },

  markArticleComplete: async function(articleName) {
    if (!AuthService.isAuthenticated()) {
      console.error('User not authenticated');
      return { success: false, message: 'المستخدم غير مسجل دخول' };
    }
    const user = AuthService.getCurrentUser();
    if (!user) {
      console.error('No user data available');
      return { success: false, message: 'بيانات المستخدم غير متوفرة' };
    }
    console.log(`Marking article ${articleName} as complete for user ${user.id}`);
    const result = await AuthService.saveProgress(user.id, articleName);
    if (result.success) {
      await this.updateProgress(articleName);
      return { success: true };
    } else {
      console.error('Failed to mark article complete:', result.message);
      return { success: false, message: result.message };
    }
  },

  updateProgress: async function(articleName) {
    if (!AuthService.isAuthenticated()) return;
    const user = AuthService.getCurrentUser();
    if (!user) {
      console.error('No user data available');
      return;
    }
    const progressData = await AuthService.getProgress(user.id);
    
    if (progressData.success) {
      const courseLevels = document.querySelectorAll('.course-level');
      courseLevels.forEach(level => {
        const levelItems = level.querySelectorAll('.course-item');
        const completedItems = Array.from(levelItems).filter(item =>
          progressData.completedArticles.includes(item.getAttribute('data-article'))
        );
        const progressPercent = (completedItems.length / levelItems.length) * 100;
        console.log(`Level progress for ${level.querySelector('.level-title')?.textContent || 'Unknown Level'}: ${progressPercent}%`);
        const progressBar = level.querySelector('.progress');
        if (progressBar) {
          progressBar.style.width = `${progressPercent}%`;
        }
      });
    } else {
      console.error('Failed to update progress:', progressData.message);
    }
  },

  getProgress: async function(userId) {
    return await AuthService.getProgress(userId);
  }
};