// ========================================
// AUTH SYSTEM FOR REACT CDN VERSION
// ========================================

const AUTH_KEY = 'blog-auth-user';
const REGISTERED_USERS_KEY = 'blog-registered-users';

// Auth functions (global scope for React components)
window.AuthSystem = {
  getCurrentUser: function() {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  setCurrentUser: function(user) {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  },

  getRegisteredUsers: function() {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveRegisteredUser: function(user) {
    const users = this.getRegisteredUsers();
    users.push(user);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  },

  findRegisteredUser: function(email) {
    const users = this.getRegisteredUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  logout: function() {
    localStorage.removeItem(AUTH_KEY);
    window.location.hash = '/';
    window.location.reload();
  },

  generateId: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // Login with email - validates against registered users
  loginWithEmail: function(email, password) {
    const registeredUser = this.findRegisteredUser(email);
    
    if (!registeredUser) {
      throw new Error('Bu email ile kayıtlı kullanıcı bulunamadı');
    }
    
    if (registeredUser.password !== password) {
      throw new Error('Şifre hatalı');
    }
    
    const user = {
      id: this.generateId(),
      name: registeredUser.name,
      email: registeredUser.email,
      provider: 'email',
      createdAt: registeredUser.createdAt
    };
    this.setCurrentUser(user);
    return user;
  },

  // Register with email - saves to registered users list
  registerWithEmail: function(name, email, password) {
    // Check if email already exists
    const existingUser = this.findRegisteredUser(email);
    if (existingUser) {
      throw new Error('Bu email adresi zaten kayıtlı');
    }
    
    // Save to registered users
    const registeredUser = {
      email: email,
      password: password,
      name: name,
      createdAt: new Date().toISOString()
    };
    this.saveRegisteredUser(registeredUser);
    
    // Create and set current user
    const user = {
      id: this.generateId(),
      name: name,
      email: email,
      provider: 'email',
      createdAt: registeredUser.createdAt
    };
    this.setCurrentUser(user);
    return user;
  },

  loginWithGoogle: function() {
    const user = {
      id: this.generateId(),
      name: 'Google Kullanıcı',
      email: 'user@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
      provider: 'google',
      createdAt: new Date().toISOString()
    };
    this.setCurrentUser(user);
    return user;
  },

  loginWithMicrosoft: function() {
    const user = {
      id: this.generateId(),
      name: 'Microsoft Kullanıcı',
      email: 'user@outlook.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=microsoft',
      provider: 'microsoft',
      createdAt: new Date().toISOString()
    };
    this.setCurrentUser(user);
    return user;
  },

  loginWithX: function() {
    const user = {
      id: this.generateId(),
      name: 'X Kullanıcı',
      email: 'user@x.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=twitter',
      provider: 'x',
      createdAt: new Date().toISOString()
    };
    this.setCurrentUser(user);
    return user;
  }
};
