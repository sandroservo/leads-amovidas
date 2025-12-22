/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { LogOut } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const email = localStorage.getItem('user_email')

    if (!token) {
      router.push('/login')
    } else {
      setUserEmail(email || '')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    router.push('/login')
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <header className="bg-white border-b-4 border-pink-400 sticky top-0 z-20 shadow-md backdrop-blur-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <img 
                  src="/img/logo.webp" 
                  alt="Amo Vidas Logo" 
                  className="h-12 w-auto drop-shadow-md"
                />
                Kanban de Leads
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie seus clientes através do funil de vendas
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{userEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-md transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 py-6 h-[calc(100vh-96px)]">
        <KanbanBoard />
      </main>
    </div>
  )
}
