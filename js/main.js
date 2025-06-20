// main.js
import { mockData } from './mock-data.js';
import { AuthService, AuthUI } from './auth.js';
import { ThemeManager } from './theme.js';
import { SidebarManager } from './sidebar.js';
import { ArticleManager } from './article.js';
import { SQLRunner } from './sql-runner.js';
import { EventHandlers } from './event-handlers.js';

// دالة لإنشاء مشغل فيديو
function createVideoPlayer(videoSource, thumbnailUrl = null) {
  const videoPlayer = document.createElement('div');
  videoPlayer.className = 'video-player';

  // التعامل مع روابط YouTube
  if (videoSource.includes('youtube.com') || videoSource.includes('youtu.be')) {
    let videoId;
    // استخراج معرف الفيديو باستخدام تعبير منتظم محسّن
    const urlParams = new URLSearchParams(new URL(videoSource).search);
    videoId = urlParams.get('v'); // الحصول على قيمة v من الرابط
    if (!videoId && videoSource.includes('youtu.be')) {
      videoId = videoSource.split('/').pop().split('?')[0]; // لروابط youtu.be
    }
    if (!videoId) {
      videoPlayer.innerHTML = '<div class="video-error">خطأ: تعذر استخراج معرف الفيديو. تأكد من صحة الرابط.</div>';
      return videoPlayer;
    }

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    iframe.frameborder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    videoPlayer.appendChild(iframe);
    return videoPlayer;
  } else if (videoSource.includes('vimeo.com')) {
    const videoId = videoSource.split('/').pop();
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=0`;
    iframe.frameborder = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    videoPlayer.appendChild(iframe);
    return videoPlayer;
  } else if (videoSource.includes('drive.google.com')) {
    const fileId = videoSource.match(/\/d\/([^/]+)/)?.[1];
    if (fileId) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
      iframe.frameborder = '0';
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      videoPlayer.appendChild(iframe);
      return videoPlayer;
    } else {
      videoPlayer.innerHTML = '<div class="video-error">خطأ: تعذر استخراج معرف الملف من Google Drive.</div>';
      return videoPlayer;
    }
  }

  // عنصر الفيديو للمصادر المحلية
  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container';

  const video = document.createElement('video');
  video.src = videoSource;
  video.preload = 'metadata';

  // عناصر التحكم
  const controls = document.createElement('div');
  controls.className = 'video-controls';

  // زر التشغيل/الإيقاف
  const playButton = document.createElement('button');
  playButton.innerHTML = '<i class="fas fa-play"></i>';
  playButton.className = 'play-button';

  // شريط التقدم
  const progressContainer = document.createElement('div');
  progressContainer.className = 'video-progress';

  const progressFilled = document.createElement('div');
  progressFilled.className = 'video-progress-filled';
  progressContainer.appendChild(progressFilled);

  // وقت الفيديو
  const timeDisplay = document.createElement('span');
  timeDisplay.className = 'video-time';
  timeDisplay.textContent = '00:00 / 00:00';

  // التحكم في الصوت
  const volumeContainer = document.createElement('div');
  volumeContainer.className = 'video-volume';

  const volumeButton = document.createElement('button');
  volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';

  const volumeSlider = document.createElement('div');
  volumeSlider.className = 'video-volume-slider';

  const volumeFilled = document.createElement('div');
  volumeFilled.className = 'video-volume-filled';
  volumeSlider.appendChild(volumeFilled);

  volumeContainer.appendChild(volumeButton);
  volumeContainer.appendChild(volumeSlider);

  // زر ملء الشاشة
  const fullscreenButton = document.createElement('button');
  fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';

  // تجميع عناصر التحكم
  controls.appendChild(playButton);
  controls.appendChild(progressContainer);
  controls.appendChild(timeDisplay);
  controls.appendChild(volumeContainer);
  controls.appendChild(fullscreenButton);

  // الصورة المصغرة (إن وجدت)
  if (thumbnailUrl) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'video-thumbnail';
    thumbnail.style.backgroundImage = `url(${thumbnailUrl})`;
    thumbnail.innerHTML = '<i class="fas fa-play"></i>';

    thumbnail.addEventListener('click', () => {
      thumbnail.style.display = 'none';
      video.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
    });

    videoContainer.appendChild(thumbnail);
  }

  videoContainer.appendChild(video);
  videoPlayer.appendChild(videoContainer);
  videoPlayer.appendChild(controls);

  // أحداث التحكم
  let isDraggingProgress = false;
  let isDraggingVolume = false;

  // تشغيل/إيقاف الفيديو
  playButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  video.addEventListener('play', () => {
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  });

  video.addEventListener('pause', () => {
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  });

  // تحديث شريط التقدم
  video.addEventListener('timeupdate', () => {
    if (!isDraggingProgress) {
      const percent = (video.currentTime / video.duration) * 100;
      progressFilled.style.width = `${percent}%`;
    }

    // تحديث الوقت
    const currentMinutes = Math.floor(video.currentTime / 60);
    const currentSeconds = Math.floor(video.currentTime % 60);
    const durationMinutes = Math.floor(video.duration / 60);
    const durationSeconds = Math.floor(video.duration % 60);

    timeDisplay.textContent = 
      `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / 
       ${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
  });

  // النقر على شريط التقدم
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });

  // السحب على شريط التقدم
  progressContainer.addEventListener('mousedown', () => {
    isDraggingProgress = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) {
      const rect = progressContainer.getBoundingClientRect();
      let pos = (e.clientX - rect.left) / rect.width;

      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;

      progressFilled.style.width = `${pos * 100}%`;
      video.currentTime = pos * video.duration;
    }
  });

  document.addEventListener('mouseup', () => {
    isDraggingProgress = false;
  });

  // التحكم في الصوت
  video.volume = 0.8; // مستوى صوت افتراضي

  volumeButton.addEventListener('click', () => {
    if (video.volume > 0) {
      video.volume = 0;
      volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      volumeFilled.style.width = '0%';
    } else {
      video.volume = 0.8;
      volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      volumeFilled.style.width = '80%';
    }
  });

  // النقر على شريط الصوت
  volumeSlider.addEventListener('click', (e) => {
    const rect = volumeSlider.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width;

    if (pos < 0) pos = 0;
    if (pos > 1) pos = 1;

    video.volume = pos;
    volumeFilled.style.width = `${pos * 100}%`;

    if (pos === 0) {
      volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (pos < 0.5) {
      volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  // السحب على شريط الصوت
  volumeSlider.addEventListener('mousedown', () => {
    isDraggingVolume = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDraggingVolume) {
      const rect = volumeSlider.getBoundingClientRect();
      let pos = (e.clientX - rect.left) / rect.width;

      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;

      video.volume = pos;
      volumeFilled.style.width = `${pos * 100}%`;

      if (pos === 0) {
        volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else if (pos < 0.5) {
        volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
      } else {
        volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isDraggingVolume = false;
  });

  // ملء الشاشة
  fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });

  return videoPlayer;
}

// دالة لتحويل روابط الفيديو إلى مشغلات
function initVideoPlayers() {
  document.querySelectorAll('.video-embed').forEach(embed => {
    const videoSource = embed.getAttribute('data-src');
    const thumbnail = embed.getAttribute('data-thumbnail');

    if (videoSource) {
      const videoPlayer = createVideoPlayer(videoSource, thumbnail);
      embed.replaceWith(videoPlayer);
    } else {
      console.error('No data-src attribute found on video-embed element', embed);
    }
  });
}

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
      setTimeout(async () => {
        await EventHandlers.updateProgress(lastArticle);
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
      }, 500);
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

  // استدعاء الدالة لتحويل الفيديوهات إلى مشغلات
  initVideoPlayers();
});