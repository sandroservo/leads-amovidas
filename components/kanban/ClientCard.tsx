/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Mail, Phone, Building2, Trash2, Pencil, Clock, MessageCircle } from 'lucide-react'
import { Client } from '@/types/client'

interface ClientCardProps {
  client: Client
  onEdit?: (client: Client) => void
  onDelete?: (id: string) => void
}

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(client.id) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} às ${hours}:${minutes}`
  }

  const openWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!client.whatsapp) return
    
    // Remover caracteres especiais do número
    const number = client.whatsapp.replace(/\D/g, '')
    const url = `https://wa.me/55${number}`
    window.open(url, '_blank')
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all hover:border-pink-400 hover:ring-1 hover:ring-pink-200 group cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 truncate leading-tight">
            {client.name || 'Sem nome'}
          </h3>
          
          {(client.email || client.whatsapp || client.notes) && (
            <div className="mt-1.5 space-y-0.5">
              {client.email && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Mail className="w-3 h-3 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{client.email}</span>
                </div>
              )}
              {client.whatsapp && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Phone className="w-3 h-3 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{client.whatsapp}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <Clock className="w-3 h-3 flex-shrink-0 text-gray-400" />
                <span>{formatDate(client.created_at)}</span>
              </div>
              {client.notes && (
                <div className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {client.notes}
                </div>
              )}
            </div>
          )}

          {client.qualify && (
            <div className="mt-2 inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-medium rounded border border-emerald-200">
              <Building2 className="w-2.5 h-2.5" />
              <span>Qualificado</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {client.whatsapp && (
            <button
              onClick={openWhatsApp}
              className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors cursor-pointer"
              title="Abrir WhatsApp"
            >
              <MessageCircle className="w-3 h-3" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(client)
              }}
              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
              title="Editar"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(String(client.id))
              }}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
              title="Deletar"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
