import { mockData } from './mock-data.js';
import { AuthService, AuthUI } from './auth.js';
import { ThemeManager } from './theme.js';
import { SidebarManager } from './sidebar.js';
import { ArticleManager } from './article.js';
import { SQLRunner } from './sql-runner.js';
import { EventHandlers } from './event-handlers.js';

document.addEventListener('DOMContentLoaded', async function () {
  hljs.highlightAll();
  SQLRunner.init();

  const UI = {
    body: document.body,
    themeToggle: document.getElementById('themeToggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    markdownContent: document.getElementById('markdown-content'),
    homeLogo: document.getElementById('homeLogo')
  };

  ThemeManager.init();
  EventHandlers.updateAuthUI();

  let lastArticle = localStorage.getItem('activeArticle') || 'home';
  if (lastArticle !== 'home' && !AuthService.isAuthenticated()) {
    lastArticle = 'home';
  }
  await ArticleManager.load(lastArticle);
  ArticleManager.setActive(lastArticle);

  // تحديث التقدم فور تحميل الصفحة مع التأكد من وجود العناصر
  if (AuthService.isAuthenticated()) {
    try {
      // إضافة تأخير بسيط لضمان تحميل DOM بالكامل
      setTimeout(async () => {
        await EventHandlers.updateProgress(lastArticle);
        // التأكد من أن الشريط مرئي
        const courseLevels = document.querySelectorAll('.course-level');
        if (courseLevels.length === 0) {
          console.error('Course levels not found in DOM');
          return;
        }
        courseLevels.forEach(level => {
          const progressBar = level.querySelector('.progress');
          if (progressBar) {
            progressBar.style.opacity = '1';
            progressBar.style.transition = 'opacity 0.3s ease-in, width 0.5s ease-in-out';
          }
        });
      }, 500); // تأخير 500 مللي ثانية لضمان تحميل DOM
    } catch (error) {
      console.error('Error updating progress on page load:', error);
    }
  }

  AuthUI.loginToggle.addEventListener('click', () => {
    if (AuthService.isAuthenticated()) {
      EventHandlers.showUserInfo();
    } else {
      AuthUI.loginModal.style.display = 'flex';
    }
  });

  AuthUI.closeModal.addEventListener('click', () => {
    AuthUI.loginModal.style.display = 'none';
  });

  AuthUI.closeRegisterModal.addEventListener('click', () => {
    AuthUI.registerModal.style.display = 'none';
  });

  AuthUI.registerBtn.addEventListener('click', () => {
    AuthUI.loginModal.style.display = 'none';
    AuthUI.registerModal.style.display = 'flex';
  });

  AuthUI.backToLoginBtn.addEventListener('click', () => {
    AuthUI.registerModal.style.display = 'none';
    AuthUI.loginModal.style.display = 'flex';
  });

  document.getElementById('closeUserModal').addEventListener('click', () => {
    document.getElementById('userInfoModal').style.display = 'none';
  });

  document.getElementById('logoutBtnModal').addEventListener('click', () => {
    EventHandlers.handleLogout();
  });

  AuthUI.loginForm.addEventListener('submit', EventHandlers.handleLogin.bind(EventHandlers));
  AuthUI.registerForm.addEventListener('submit', EventHandlers.handleRegister.bind(EventHandlers));

  UI.themeToggle.addEventListener('click', ThemeManager.toggle);
  UI.sidebarToggle.addEventListener('click', SidebarManager.toggle);
  UI.homeLogo.addEventListener('click', EventHandlers.handleHomeClick);

  document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', EventHandlers.handleArticleClick);
  });

  window.addEventListener('resize', SidebarManager.handleVisibility);
});