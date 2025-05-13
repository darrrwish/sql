// auth.js
export const AuthService = {
  pb: new PocketBase('http://127.0.0.1:8090'),
  
  async login(identifier, password) {
    try {
      const authData = await this.pb.collection('users').authWithPassword(identifier, password);
      return { success: true, user: authData.record };
    } catch (error) {
      return { success: false, message: 'البريد/اسم المستخدم أو كلمة المرور غير صحيحة' };
    }
  },
  
  async register(username, email, phone, password) {
    try {
      const data = {
        username,
        email,
        phone,
        password,
        passwordConfirm: password,
        emailVisibility: true
      };
      
      // إنشاء الحساب ثم تسجيل الدخول تلقائيًا
      await this.pb.collection('users').create(data);
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      
      return { success: true, message: 'تم إنشاء الحساب بنجاح', user: authData.record };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  
  logout() {
    this.pb.authStore.clear();
  },
  
  isAuthenticated() {
    return this.pb.authStore.isValid;
  },
  
  getCurrentUser() {
    return this.pb.authStore.model;
  }
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