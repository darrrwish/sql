import { AuthService, AuthUI } from './auth.js';
import { ArticleManager } from './article.js';
import { SidebarManager } from './sidebar.js';

export const EventHandlers = {
  async handleLogin(e) {
    e.preventDefault();
    const identifier = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    const result = await AuthService.login(identifier, password);
    if (result.success) {
      AuthUI.loginModal.style.display = 'none';
      this.updateAuthUI();
    } else {
      AuthUI.loginError.textContent = `❌ ${result.message}`;
      AuthUI.loginError.style.display = 'block';
    }
  },
  
  async handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('regPassword').value;
    
    // Validate password strength
    if (password.length < 8) {
      AuthUI.registerError.textContent = '❌ كلمة المرور يجب أن تكون 8 أحرف على الأقل';
      AuthUI.registerError.style.display = 'block';
      return;
    }
    
    const result = await AuthService.register(username, email, phone, password);
    if (result.success) {
      AuthUI.registerModal.style.display = 'none';
      this.updateAuthUI();
      alert('✅ تم إنشاء الحساب بنجاح');
    } else {
      AuthUI.registerError.textContent = `❌ ${result.message}`;
      AuthUI.registerError.style.display = 'block';
    }
  },
  
  handleArticleClick: function() {
    if (window.innerWidth <= 768) {
      SidebarManager.handleVisibility();
    }
    
    const articleName = this.getAttribute('data-article');
    ArticleManager.setActive(articleName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ArticleManager.load(articleName);
  },
  
  handleHomeClick: () => {
    ArticleManager.load('home');
    ArticleManager.setActive('home');
    window.scrollTo(0, 0);
  },
  
  updateAuthUI: () => {
    const loginToggle = document.getElementById('loginToggle');
    if (AuthService.isAuthenticated()) {
      const user = AuthService.getCurrentUser();
      loginToggle.innerHTML = `<i class="fas fa-user-check"></i>`;
      loginToggle.onclick = () => this.showUserInfo();
    } else {
      loginToggle.innerHTML = `<i class="fas fa-user"></i>`;
      loginToggle.onclick = () => {
        AuthUI.loginModal.style.display = 'flex';
      };
    }
  },
  
  showUserInfo: () => {
    const user = AuthService.getCurrentUser();
    document.getElementById('infoUsername').textContent = user.username;
    document.getElementById('infoEmail').textContent = user.email;
    document.getElementById('infoPhone').textContent = user.phone;
    document.getElementById('userInfoModal').style.display = 'flex';
  },
  
  handleLogout: () => {
    AuthService.logout();
    document.getElementById('userInfoModal').style.display = 'none';
    this.updateAuthUI();
    location.reload(); // إعادة تحميل الصفحة
  }
};