export const ThemeManager = {
  init: () => {
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.classList.remove('dark-mode', 'light-mode'); // إزالة الكلاسات القديمة
    document.body.classList.add(savedTheme);
    document.getElementById('themeToggle').innerHTML = 
      savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  },
  
  toggle: () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    document.getElementById('themeToggle').innerHTML = 
      currentTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
};