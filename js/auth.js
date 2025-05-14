const { createClient } = window.supabase || require('@supabase/supabase-js');

const supabase = createClient('https://piptxohsbpmballudycw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcHR4b2hzYnBtYmFsbHVkeWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMTQwMDMsImV4cCI6MjA2MjU5MDAwM30.r2ytfs-4jhy3AWOA8NkmDc-DUdDhtETFCUkQJrEJTUQ');

export const AuthService = {
  async login(emailOrUsername, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername.includes('@') ? emailOrUsername : null,
        username: emailOrUsername.includes('@') ? null : emailOrUsername,
        password: password,
      });
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: 'البريد/اسم المستخدم أو كلمة المرور غير صحيحة' };
    }
  },

  async register(username, email, phone, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { username: username, phone: phone },
        },
      });
      if (error) throw error;
      return { 
        success: true, 
        message: 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتفعيل الحساب.' 
      };
    } catch (error) {
      let errorMessage = 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.';
      if (error.message.includes('already registered')) {
        errorMessage = 'البريد الإلكتروني مسجل مسبقًا.';
      } else if (error.message.includes('invalid')) {
        errorMessage = 'بيانات غير صحيحة.';
      }
      return { success: false, message: errorMessage };
    }
  },

  logout() {
    supabase.auth.signOut();
  },

  isAuthenticated() {
    return !!supabase.auth.getUser();
  },

  getCurrentUser() {
    return supabase.auth.getUser().data?.user || null;
  },

  isVerified() {
    const user = this.getCurrentUser();
    return user ? user.email_confirmed_at !== null : false;
  },
};

export const AuthUI = {
  loginToggle: document.getElementById('loginToggle'),
  loginModal: document.getElementById('loginModal'),
  closeModal: document.getElementById('closeModal'),
  loginForm: document.getElementById('loginForm'),
  registerBtn: document.getElementById('registerBtn'),
  backToLoginBtn: document.getElementById('backToLoginBtn'),
  loginError: document.getElementById('loginError'),
  registerModal: document.getElementById('registerModal'),
  closeRegisterModal: document.getElementById('closeRegisterModal'),
  registerForm: document.getElementById('registerForm'),
  registerError: document.getElementById('registerError')
};