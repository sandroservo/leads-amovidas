/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware desabilitado - autenticação via localStorage no client-side
  // Para habilitar autenticação via cookies, implemente lógica no login para salvar cookies
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|img/).*)',
  ],
}
