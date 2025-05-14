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
    
    if (!regUsername || !regEmail || !phoneInput || !regPassword) {
      console.error('Register form elements not found');
      this.isSubmitting = false;
      return;
    }

    const username = regUsername.value.trim();
    const email = regEmail.value.trim();
    const phone = phoneInput.value.trim();
    const password = regPassword.value;
    
    if (password.length < 8) {
      AuthUI.registerError.innerHTML = `<i class="fas fa-exclamation-circle"></i> كلمة المرور يجب أن تكون 8 أحرف على الأقل`;
      AuthUI.registerError.style.display = 'block';
      this.isSubmitting = false;
      return;
    }
    
    const result = await AuthService.register(username, email, phone, password);
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
  
  handleArticleClick: function() {
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
  
  showUserInfo: function() {
    const user = AuthService.getCurrentUser();
    const infoUsername = document.getElementById('infoUsername');
    const infoEmail = document.getElementById('infoEmail');
    const infoPhone = document.getElementById('infoPhone');
    const verificationStatus = document.getElementById('infoVerificationStatus');
    const userInfoModal = document.getElementById('userInfoModal');
    
    if (!infoUsername || !infoEmail || !infoPhone || !verificationStatus || !userInfoModal) {
      console.error('User info modal elements not found');
      return;
    }
    
    infoUsername.textContent = user.user_metadata?.username || 'غير محدد';
    infoEmail.textContent = user.email;
    infoPhone.textContent = user.user_metadata?.phone || 'غير محدد';
    verificationStatus.innerHTML = user.email_confirmed_at 
      ? '<i class="fas fa-check-circle"></i> الحساب مفعل' 
      : '<i class="fas fa-exclamation-circle"></i> الحساب غير مفعل. تحقق من بريدك الإلكتروني لتفعيله.';
    verificationStatus.className = user.email_confirmed_at ? 'alert alert-success' : 'alert alert-warning';
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
  }
};