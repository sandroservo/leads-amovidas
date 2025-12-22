/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { KanbanColumn } from './KanbanColumn'
import { ClientCard } from './ClientCard'
import { EditClientModal } from './EditClientModal'
import {
  Client,
  ClientStatus,
  CLIENT_STATUS_LABELS,
  CLIENT_STATUS_COLORS,
} from '@/types/client'
import { supabase } from '@/lib/supabase'

const STATUSES: ClientStatus[] = [
  'NOVO',
  'CONTATO_INICIAL',
  'QUALIFICADO',
  'NEGOCIACAO',
  'GANHO',
  'PERDIDO',
]

export function KanbanBoard() {
  const [clients, setClients] = useState<Client[]>([])
  const [activeClient, setActiveClient] = useState<Client | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    fetchClients()

    // Configurar Supabase Realtime para atualização automática
    const channel = supabase
      .channel('clients-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clients',
        },
        (payload) => {
          console.log('Mudança detectada:', payload)

          if (payload.eventType === 'INSERT') {
            setClients((prev) => [...prev, payload.new as Client])
          } else if (payload.eventType === 'UPDATE') {
            setClients((prev) =>
              prev.map((c) =>
                c.id === (payload.new as Client).id ? (payload.new as Client) : c
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setClients((prev) =>
              prev.filter((c) => c.id !== (payload.old as Client).id)
            )
          }
        }
      )
      .subscribe()

    // Cleanup: desinscrever ao desmontar componente
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Erro ao buscar clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const client = clients.find((c) => String(c.id) === event.active.id)
    setActiveClient(client || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveClient(null)

    if (!over) return

    const clientId = Number(active.id)
    const newStatus = over.id as ClientStatus

    const client = clients.find((c) => c.id === clientId)
    if (!client || client.status === newStatus) return

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, status: newStatus } : c
      )
    )

    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        setClients((prev) =>
          prev.map((c) =>
            c.id === clientId ? { ...c, status: client.status } : c
          )
        )
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      setClients((prev) =>
        prev.map((c) =>
          c.id === clientId ? { ...c, status: client.status } : c
        )
      )
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleSave = async (id: number, data: Partial<Client>) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Erro ao atualizar')

      const updatedClient = await response.json()
      setClients(clients.map((c) => (c.id === id ? updatedClient : c)))
    } catch (error) {
      console.error('Erro ao atualizar client:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) return

    const clientId = Number(id)
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setClients((prev) => prev.filter((c) => c.id !== clientId))
      }
    } catch (error) {
      console.error('Erro ao deletar client:', error)
    }
  }

  const getClientsByStatus = (status: ClientStatus) => {
    return clients.filter((c) => c.status === status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          <div className="text-gray-600 text-sm">Carregando leads...</div>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-6 gap-3 h-full">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            title={CLIENT_STATUS_LABELS[status]}
            clients={getClientsByStatus(status)}
            color={CLIENT_STATUS_COLORS[status]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <DragOverlay>
        {activeClient ? (
          <div className="rotate-2 scale-105 opacity-90">
            <ClientCard client={activeClient} />
          </div>
        ) : null}
      </DragOverlay>

      <EditClientModal
        client={editingClient}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingClient(null)
        }}
        onSave={handleSave}
      />
    </DndContext>
  )
}
