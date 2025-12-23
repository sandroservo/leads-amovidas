/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const clientId = parseInt(id, 10)
    const body = await request.json()

    if (isNaN(clientId)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('clients')
      .update(body)
      .eq('id', clientId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar client:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar client' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const clientId = parseInt(id, 10)

    if (isNaN(clientId)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar client:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar client' },
      { status: 500 }
    )
  }
}
