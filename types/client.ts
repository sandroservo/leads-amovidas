/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

export type ClientStatus = 
  | 'NOVO'
  | 'CONTATO_INICIAL'
  | 'QUALIFICADO'
  | 'NEGOCIACAO'
  | 'GANHO'
  | 'PERDIDO'

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  NOVO: 'Novo',
  CONTATO_INICIAL: 'Contato Inicial',
  QUALIFICADO: 'Qualificado',
  NEGOCIACAO: 'Negociação',
  GANHO: 'Ganho',
  PERDIDO: 'Perdido',
}

export const CLIENT_STATUS_COLORS: Record<ClientStatus, string> = {
  NOVO: 'border-blue-500 bg-blue-50',
  CONTATO_INICIAL: 'border-amber-500 bg-amber-50',
  QUALIFICADO: 'border-pink-500 bg-pink-50',
  NEGOCIACAO: 'border-purple-500 bg-purple-50',
  GANHO: 'border-green-500 bg-green-50',
  PERDIDO: 'border-slate-500 bg-slate-50',
}

export const CLIENT_STATUS_TEXT_COLORS: Record<ClientStatus, string> = {
  NOVO: 'text-blue-700',
  CONTATO_INICIAL: 'text-amber-700',
  QUALIFICADO: 'text-pink-700',
  NEGOCIACAO: 'text-purple-700',
  GANHO: 'text-green-700',
  PERDIDO: 'text-slate-700',
}

export interface Client {
  id: number
  whatsapp: string | null
  name: string | null
  email: string | null
  notes: string | null
  qualify: boolean | null
  status: ClientStatus
  previous_status: ClientStatus | null
  created_at: Date
}
