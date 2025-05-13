export const SidebarManager = {
  toggle: () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    sidebar.classList.toggle('visible');
    sidebarToggle.innerHTML = sidebar.classList.contains('visible')
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-database"></i>';
  },
  
  handleVisibility: () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('visible');
      sidebarToggle.innerHTML = '<i class="fa-solid fa-database"></i>';
    }
  }
};