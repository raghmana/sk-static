import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Handle admin dashboard routes
  if (path.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin-token');
    console.log('Checking dashboard access, token:', token);
    
    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Handle admin login route
  if (path === '/admin') {
    const token = request.cookies.get('admin-token');
    console.log('Checking login access, token:', token);
    
    if (token) {
      console.log('Token found, redirecting to dashboard');
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/admin',
    '/admin/dashboard/:path*'
  ]
};