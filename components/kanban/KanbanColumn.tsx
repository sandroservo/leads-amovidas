/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ClientCard } from './ClientCard'
import { Client, ClientStatus } from '@/types/client'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  status: ClientStatus
  title: string
  clients: Client[]
  color: string
  onEdit?: (client: Client) => void
  onDelete?: (id: string) => void
}

export function KanbanColumn({ 
  status, 
  title, 
  clients, 
  color,
  onEdit,
  onDelete 
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div className="flex flex-col h-full">
      <div className={cn('rounded-t-lg border-t-4 p-2.5 shadow-sm', color)}>
        <h2 className="font-semibold text-gray-900 text-sm flex items-center justify-between">
          <span className="truncate">{title}</span>
          <span className="text-xs bg-white px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-1">
            {clients.length}
          </span>
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-2 bg-white/50 rounded-b-lg border border-t-0 border-gray-200 transition-all overflow-y-auto',
          'scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-transparent hover:scrollbar-thumb-pink-500',
          isOver && 'bg-pink-50 border-pink-400 shadow-inner ring-2 ring-pink-200'
        )}
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        <SortableContext
          items={clients.map(c => String(c.id))}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {clients.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-xs">
                Arraste leads aqui
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
