/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Mail, Phone, Building2, Trash2, Pencil, Clock, MessageCircle, ArrowRight } from 'lucide-react'
import { Client, CLIENT_STATUS_LABELS } from '@/types/client'

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

          <div className="mt-2 flex flex-wrap gap-1">
            {client.qualify && (
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-medium rounded border border-emerald-200">
                <Building2 className="w-2.5 h-2.5" />
                <span>Qualificado</span>
              </div>
            )}
            {client.previous_status && client.previous_status !== client.status && (
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded border border-blue-200">
                <ArrowRight className="w-2.5 h-2.5" />
                <span>Para: {CLIENT_STATUS_LABELS[client.status]}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          {client.whatsapp && (
            <button
              onClick={openWhatsApp}
              className="p-1.5 text-white bg-green-500 hover:bg-green-600 rounded-full shadow-sm transition-all cursor-pointer"
              title="Abrir WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </button>
          )}
          <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
    </div>
  )
}
