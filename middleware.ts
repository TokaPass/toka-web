import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!request.cookies.has("token")) {
      return Response.redirect(new URL('/login', request.url))
    }

    let authToken = request.cookies.get("token")

    return Response.redirect(new URL('/', request.url))
  }
}
