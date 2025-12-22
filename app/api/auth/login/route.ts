/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

import { NextRequest, NextResponse } from 'next/server'

// Credenciais de exemplo - EM PRODUÇÃO, use banco de dados com hash de senha
const VALID_USERS = [
  {
    email: 'admin@amovidas.com.br',
    password: 'amovidas2025', // EM PRODUÇÃO: usar bcrypt
  },
  {
    email: 'gestor@amovidas.com.br',
    password: 'gestor123',
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar credenciais
    const user = VALID_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Gerar token simples (EM PRODUÇÃO: usar JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}
