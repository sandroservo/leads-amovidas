# 🚀 Início Rápido - Supabase Self-Hosted via API

## ✅ Configuração Completa (Sem Prisma)

O projeto foi **ajustado para usar Supabase Client via API REST**, sem necessidade de liberar a porta PostgreSQL!

## 📝 Passo 1: Adicionar Coluna `status` no Banco

Acesse o **SQL Editor** no seu Supabase Dashboard (`https://supabase.amovidas.com.br`) e execute:

```sql
-- Adicionar coluna status
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'NOVO';

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

-- Atualizar registros existentes baseado no campo qualify
UPDATE clients 
SET status = CASE 
  WHEN qualify = true THEN 'QUALIFICADO'
  ELSE 'NOVO'
END
WHERE status = 'NOVO';

-- Adicionar constraint para validar valores de status
ALTER TABLE clients ADD CONSTRAINT check_status_values 
  CHECK (status IN ('NOVO', 'CONTATO_INICIAL', 'QUALIFICADO', 'NEGOCIACAO', 'GANHO', 'PERDIDO'));
```

## 📝 Passo 2: Confirmar `.env`

Seu arquivo `.env` deve ter apenas:

```env
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

**Não precisa de `DATABASE_URL`!** O sistema usa a API REST do Supabase.

## 📝 Passo 3: Rodar o Projeto

```bash
npm run dev
```

Acesse: http://localhost:3000 (ou http://localhost:3001 se a porta 3000 estiver ocupada)

## ✅ Como Funciona Agora

**Antes:** Prisma → PostgreSQL direto (porta 5432) ❌

**Agora:** Next.js → Supabase REST API → PostgreSQL ✅

**Vantagens:**
- ✅ Não precisa liberar porta 5432
- ✅ Usa autenticação via ANON_KEY
- ✅ Funciona com Supabase self-hosted
- ✅ Mais seguro (API gerencia permissões)

## 🎯 Funcionalidades

- **Kanban com 6 colunas**
- **Drag & drop** entre status
- **Visualização:** nome, email, whatsapp, notas
- **Editar e deletar** clientes
- **Badge "Qualificado"** se qualify = true

## 🔍 Verificação

1. Execute o SQL no Supabase Dashboard
2. Rode `npm run dev`
3. Acesse http://localhost:3000
4. Seus clientes devem aparecer no Kanban
5. Arraste um card para outra coluna
6. Verifique no Supabase que o status foi atualizado

## ⚠️ Troubleshooting

**Erro: fetch failed ou network error**
→ Confirme que `NEXT_PUBLIC_SUPABASE_URL` está correto
→ Teste acessar `https://supabase.amovidas.com.br` no navegador

**Clientes não aparecem**
→ Verifique se executou o SQL para adicionar a coluna `status`
→ Confirme que há registros na tabela `clients`
→ Verifique permissões RLS (Row Level Security) no Supabase

**Erro 401 Unauthorized**
→ Confirme que `NEXT_PUBLIC_SUPABASE_ANON_KEY` está correto
→ Verifique se as políticas RLS permitem acesso público

## 🔐 Permissões RLS (Se Necessário)

Se você tem Row Level Security habilitado, crie políticas no Supabase:

```sql
-- Permitir SELECT público
CREATE POLICY "Permitir leitura pública" ON clients
  FOR SELECT USING (true);

-- Permitir INSERT público
CREATE POLICY "Permitir inserção pública" ON clients
  FOR INSERT WITH CHECK (true);

-- Permitir UPDATE público
CREATE POLICY "Permitir atualização pública" ON clients
  FOR UPDATE USING (true);

-- Permitir DELETE público
CREATE POLICY "Permitir exclusão pública" ON clients
  FOR DELETE USING (true);
```

**Nota:** Isso permite acesso público. Para produção, ajuste as políticas conforme suas regras de negócio.

## 🎉 Pronto!

O Kanban está funcionando via API REST, sem necessidade de conexão direta ao PostgreSQL!
