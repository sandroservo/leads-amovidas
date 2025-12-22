# 🔍 Debug - Kanban Não Mostra Clientes

## Checklist de Verificação

### 1. Verificar se a coluna `status` foi adicionada

Acesse o **SQL Editor** do Supabase e execute:

```sql
-- Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'clients';
```

**Resultado esperado:** Deve aparecer a coluna `status` na lista.

### 2. Verificar se há registros na tabela

```sql
-- Ver quantos clientes existem
SELECT COUNT(*) FROM clients;

-- Ver primeiros 5 clientes
SELECT id, name, email, status FROM clients LIMIT 5;
```

### 3. Verificar Row Level Security (RLS)

O RLS pode estar bloqueando o acesso. Execute:

```sql
-- Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'clients';
```

**Se `rowsecurity = true`**, você precisa adicionar políticas:

```sql
-- OPÇÃO 1: Desabilitar RLS (apenas para desenvolvimento)
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
```

**OU**

```sql
-- OPÇÃO 2: Adicionar políticas RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT público
DROP POLICY IF EXISTS "Permitir leitura pública" ON clients;
CREATE POLICY "Permitir leitura pública" ON clients
  FOR SELECT USING (true);

-- Permitir INSERT público
DROP POLICY IF EXISTS "Permitir inserção pública" ON clients;
CREATE POLICY "Permitir inserção pública" ON clients
  FOR INSERT WITH CHECK (true);

-- Permitir UPDATE público
DROP POLICY IF EXISTS "Permitir atualização pública" ON clients;
CREATE POLICY "Permitir atualização pública" ON clients
  FOR UPDATE USING (true);

-- Permitir DELETE público
DROP POLICY IF EXISTS "Permitir exclusão pública" ON clients;
CREATE POLICY "Permitir exclusão pública" ON clients
  FOR DELETE USING (true);
```

### 4. Testar API diretamente

Abra o navegador ou use curl:

```bash
curl http://localhost:3001/api/clients
```

**Se retornar `[]` (array vazio):** Não há clientes ou RLS está bloqueando

**Se retornar erro:** Problema de conexão ou permissão

### 5. Adicionar coluna status (se ainda não fez)

```sql
-- Adicionar coluna status
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'NOVO';

-- Criar índice
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

-- Atualizar registros existentes
UPDATE clients 
SET status = CASE 
  WHEN qualify = true THEN 'QUALIFICADO'
  ELSE 'NOVO'
END
WHERE status IS NULL OR status = 'NOVO';
```

### 6. Inserir cliente de teste

Se a tabela estiver vazia, adicione um cliente de teste:

```sql
INSERT INTO clients (name, email, whatsapp, status, qualify)
VALUES ('João Silva', 'joao@example.com', '11999999999', 'NOVO', false);
```

### 7. Verificar variáveis de ambiente

Confirme que o arquivo `.env` tem:

```env
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

## 🎯 Solução Rápida (Mais Provável)

**O problema mais comum é RLS habilitado sem políticas.**

Execute no SQL Editor:

```sql
-- Solução rápida: desabilitar RLS
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
```

Depois recarregue http://localhost:3001

## 📊 Verificar Console do Navegador

1. Abra http://localhost:3001
2. Pressione **F12** para abrir DevTools
3. Vá na aba **Console**
4. Veja se há erros em vermelho
5. Vá na aba **Network**
6. Recarregue a página
7. Clique em `/api/clients`
8. Veja o Response

Me envie o que aparece no Response!
