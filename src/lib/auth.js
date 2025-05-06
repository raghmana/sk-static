import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const token = Cookies.get('admin-authenticated');
  return token === process.env.NEXT_PUBLIC_AUTH_TOKEN;
};

export const login = async (username, password) => {
  try {
    // Use environment variables from Amplify
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured');
      return false;
    }

    if (username === adminUsername && password === adminPassword) {
      // Store a secure token instead of just 'true'
      Cookies.set('admin-authenticated', process.env.NEXT_PUBLIC_AUTH_TOKEN, { 
        expires: 1, // 1 day
        sameSite: 'strict',
        secure: true,
        path: '/'
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    // Remove client-side cookie
    Cookies.remove('admin-authenticated', {
      path: '/',
      sameSite: 'strict',
      secure: true
    });

    // Call logout API to remove HTTP-only cookie
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    console.log('Logged out successfully');
    window.location.href = '/admin';
  } catch (error) {
    console.error('Logout error:', error);
  }
};