const errorTranslations = {
  'already exists': 'مستخدم من قبل',
  'is already taken': 'محجوز مسبقًا',
  'value must be unique': 'يجب أن يكون فريدًا'
};

export const AuthService = {
  pb: new PocketBase('https://pb.ahmeddarwish.info'),

  async login(identifier, password) {
    try {
      const authData = await this.pb.collection('users').authWithPassword(identifier, password);
      if (!authData.record.verified) {
        return { 
          success: false, 
          message: 'الحساب غير مفعل. الرجاء التحقق من بريدك الإلكتروني لتفعيل الحساب.' 
        };
      }
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'البريد/اسم المستخدم أو كلمة المرور غير صحيحة' };
    }
  },

  async register(username, email, phone, password, name) {
    try {
      const data = {
        username,
        email,
        phone,
        name,
        password,
        passwordConfirm: password,
        emailVisibility: true
      };
      
      await this.pb.collection('users').create(data);
      await this.pb.collection('users').requestVerification(email);
      
      return { 
        success: true, 
        message: 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتفعيل الحساب.' 
      };
    } catch (error) {
      console.error('Register error:', error);
      if (error.status === 400) {
        let errorMessage = 'حدث خطأ في التحقق';
        const normalizeMessage = (msg) => msg.toLowerCase().trim();
        if (error.data?.data?.email?.message) {
          const normalizedEmailMessage = normalizeMessage(error.data.data.email.message);
          errorMessage = `البريد الإلكتروني ${errorTranslations[normalizedEmailMessage] || error.data.data.email.message}`;
        }
        if (error.data?.data?.username?.message) {
          const normalizedUsernameMessage = normalizeMessage(error.data.data.username.message);
          errorMessage = `اسم المستخدم ${errorTranslations[normalizedUsernameMessage] || error.data.data.username.message}`;
        }
        return { success: false, message: errorMessage };
      }
      if (error.status === 429) {
        return { success: false, message: 'الكثير من الطلبات. حاول مرة أخرى لاحقًا.' };
      }
      return { 
        success: false, 
        message: `حدث خطأ أثناء التسجيل: ${error.message}` 
      };
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
  },

  isVerified() {
    const user = this.getCurrentUser();
    return user ? user.verified : false;
  },

  async saveProgress(userId, articleName) {
    try {
      if (!userId || !articleName) {
        throw new Error('Invalid userId or articleName');
      }
      console.log(`Saving progress for user: ${userId}, article: ${articleName}`);
      const existing = await this.pb.collection('user_progress').getList(1, 1, {
        filter: `user_id ~ "${userId}" && article = "${articleName}"`
      });
      if (existing.items.length > 0) {
        console.log(`Article ${articleName} already marked as complete for user ${userId}`);
        return { success: true };
      }

      const result = await this.pb.collection('user_progress').create({
        user_id: [userId], // إرسال كمصفوفة لأن الحقل يسمح بـ Multiple
        article: articleName,
        completed: true
      });
      console.log('Progress saved:', result);
      return { success: true };
    } catch (error) {
      console.error('Error saving progress:', error, error.data);
      return { success: false, message: `فشل في حفظ التقدم: ${error.message}` };
    }
  },

  async getProgress(userId) {
    try {
      console.log(`Fetching progress for user: ${userId}`);
      const records = await this.pb.collection('user_progress').getList(1, 50, {
        filter: `user_id ~ "${userId}"`
      });
      const completedArticles = records.items.map(item => item.article);
      console.log(`Progress fetched: ${completedArticles.length} articles completed`);
      return {
        success: true,
        completedArticles
      };
    } catch (error) {
      console.error('Error fetching progress:', error, error.data);
      return { success: false, message: `فشل في جلب التقدم: ${error.message}` };
    }
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