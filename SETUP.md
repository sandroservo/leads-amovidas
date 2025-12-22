# 🚀 Configuração do Kanban - Passo a Passo

## ✅ Estrutura da Tabela `clients` Detectada

Campos existentes no seu banco:
- `id` (int8) - Primary Key
- `whatsapp` (text)
- `name` (text)
- `email` (text)
- `notes` (text)
- `qualify` (bool)
- `created_at` (timestamptz)

## 📝 Passo 1: Adicionar Coluna `status` no Supabase

Abra o **SQL Editor** no Supabase e execute o arquivo `migration.sql`:

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

## 📝 Passo 2: Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env` na raiz do projeto:

```env
# Connection string do PostgreSQL do Supabase
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.xxx.supabase.co:5432/postgres"

# Credenciais públicas do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

**Como encontrar a DATABASE_URL:**
1. Supabase Dashboard → **Project Settings** → **Database**
2. **Connection string** → **URI** (modo Transaction)
3. Copie e substitua `[YOUR-PASSWORD]` pela senha real

## 📝 Passo 3: Introspection do Banco

Execute no terminal:

```bash
npx prisma db pull
```

Isso vai gerar automaticamente o `schema.prisma` com a estrutura da sua tabela `clients`.

## 📝 Passo 4: Gerar Prisma Client

```bash
npx prisma generate
```

Isso cria o Prisma Client tipado com os campos da sua tabela.

## 📝 Passo 5: Rodar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🎯 Como Funciona

**Kanban com 6 Colunas:**
1. **Novo** - Leads recém-criados
2. **Contato Inicial** - Primeiro contato realizado
3. **Qualificado** - Lead validado e qualificado
4. **Negociação** - Em processo de negociação
5. **Ganho** - Cliente conquistado
6. **Perdido** - Oportunidade perdida

**Funcionalidades:**
- ✅ Drag & drop entre colunas
- ✅ Atualização automática do status
- ✅ Visualização de: nome, email, whatsapp, notas
- ✅ Badge "Qualificado" se `qualify = true`
- ✅ Editar e deletar clientes

## 🔍 Verificação

Para verificar se está funcionando:

1. Acesse o Kanban em `http://localhost:3000`
2. Seus clientes devem aparecer na coluna "Novo" ou "Qualificado"
3. Arraste um card para outra coluna
4. Verifique no Supabase que o campo `status` foi atualizado

## ⚠️ Troubleshooting

**Erro: Module '@prisma/client' has no exported member 'PrismaClient'**
→ Execute: `npx prisma generate`

**Erro: Can't reach database server**
→ Verifique a `DATABASE_URL` no `.env`
→ Confirme que seu IP está autorizado no Supabase

**Clientes não aparecem**
→ Confirme que executou o SQL para adicionar a coluna `status`
→ Verifique se há registros na tabela `clients`

## 📊 Campos Exibidos no Kanban

- **Nome** - `clients.name`
- **Email** - `clients.email`
- **WhatsApp** - `clients.whatsapp`
- **Notas** - `clients.notes` (truncado)
- **Badge Qualificado** - Se `clients.qualify = true`
