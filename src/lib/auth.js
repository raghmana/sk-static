import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    // Server-side - handle differently if using getServerSideProps
    return false;
  }
  return Cookies.get('admin-authenticated') === 'true';
};

export const login = async (username, password) => {
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  
  if (username === adminUsername && password === adminPassword) {
    Cookies.set('admin-authenticated', 'true', { 
      expires: 1, // 1 day
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    return true;
  }
  return false;
};

export const logout = () => {
  Cookies.remove('admin-authenticated', {
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
};