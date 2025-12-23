import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugClients() {
  console.log('🔍 Buscando últimos clientes atualizados...')
  
  const { data, error } = await supabase
    .from('clients')
    .select('id, name, status, previous_status, qualify')
    .order('id', { ascending: false })
    .limit(10)
  
  if (error) {
    console.error('❌ Erro:', error)
    return
  }
  
  console.log('\n📋 Clientes (últimos 10):')
  data?.forEach(client => {
    console.log(`\nID: ${client.id} - ${client.name || 'Sem nome'}`)
    console.log(`  Status: ${client.status}`)
    console.log(`  Previous Status: ${client.previous_status || 'NULL'} ${client.previous_status ? '✅' : '❌'}`)
    console.log(`  Qualify: ${client.qualify ? 'SIM' : 'NÃO'}`)
  })
  
  const withPrevious = data?.filter(c => c.previous_status !== null).length || 0
  console.log(`\n📊 Total com previous_status preenchido: ${withPrevious}`)
}

debugClients()
