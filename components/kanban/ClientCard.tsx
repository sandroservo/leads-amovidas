/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Mail, Phone, Building2, Trash2, Pencil, Clock } from 'lucide-react'
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-md border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all hover:border-pink-400 hover:ring-1 hover:ring-pink-200 group"
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mt-0.5 text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        
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
          {onEdit && (
            <button
              onClick={() => onEdit(client)}
              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Editar"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(String(client.id))}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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
