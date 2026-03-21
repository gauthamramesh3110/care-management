export function middleware(request: any) {
  const { pathname } = request.nextUrl;
  
  // Public routes
  if (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup') || pathname.startsWith('/api/auth')) {
    return;
  }

  // Check simple cookie authentication (replace with robust validation in production)
  const isAuthenticated = request.cookies.get('isAuthenticated');

  // If not authenticated and trying to access a protected route, redirect to signin
  if (!isAuthenticated && pathname !== '/auth/signin') {
    return Response.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
