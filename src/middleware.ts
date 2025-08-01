

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Temporarily disable middleware to test routing
  console.log('Middleware:', { pathname })
  
  // For now, allow all dashboard routes
  return NextResponse.next()
  
  // Check if user is trying to access dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Skip middleware for login and signup routes
    if (pathname.includes('/login') || pathname.includes('/signup')) {
      console.log('Middleware: Allowing login/signup route')
      return NextResponse.next()
    }

    // Check for tokens in cookies or headers
    const accessToken = request.cookies.get('accessToken')?.value || 
                       request.headers.get('authorization')?.replace('Bearer ', '')
    const refreshToken = request.cookies.get('refreshToken')?.value ||
                        request.cookies.get(process.env.CAR_TOKEN_NAME || 'refreshToken')?.value

    console.log('Middleware: Token check', { 
      hasAccessToken: !!accessToken, 
      hasRefreshToken: !!refreshToken,
      cookieNames: request.cookies.getAll().map(c => c.name)
    })

    // If no tokens, redirect to login
    if (!accessToken && !refreshToken) {
      console.log('Middleware: Redirecting to login')
      const loginUrl = new URL('/dashboard/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}