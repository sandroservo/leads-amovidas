# Kanban de Qualificação de Leads

Sistema completo de gerenciamento de leads com interface Kanban drag-and-drop, desenvolvido com Next.js, Prisma, Supabase e Tailwind CSS.

**Autor:** Sandro Servo  
**Site:** https://cloudservo.com.br  
**Versão:** 1.0.0

## Stack Tecnológica

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** Supabase PostgreSQL
- **ORM:** Prisma 7
- **Drag & Drop:** @dnd-kit
- **Ícones:** Lucide React

## Funcionalidades

✅ Interface Kanban drag-and-drop para qualificação de leads  
✅ 6 colunas de status: Novo, Contato Inicial, Qualificado, Negociação, Ganho, Perdido  
✅ CRUD completo através de API REST  
✅ Atualização otimista de UI  
✅ Design responsivo (mobile, tablet, desktop)  
✅ Integração completa com Supabase PostgreSQL  

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Connection string do PostgreSQL do Supabase
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.xxx.supabase.co:5432/postgres"

# Credenciais públicas do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

**Como encontrar a DATABASE_URL:**
1. Acesse seu projeto no Supabase
2. Vá em **Project Settings** → **Database**
3. Em **Connection string**, copie a URI (modo Transaction ou Session)
4. Substitua `[YOUR-PASSWORD]` pela senha real do banco

### 2. Preparar o Banco de Dados

O projeto está configurado para usar sua tabela existente `clients`. Você precisa adicionar uma coluna `status` se ela não existir:

```sql
-- Adicione a coluna status na tabela clients (se não existir)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'NOVO';

-- Opcional: Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
```

Os valores de status aceitos são:
- `NOVO`
- `CONTATO_INICIAL`
- `QUALIFICADO`
- `NEGOCIACAO`
- `GANHO`
- `PERDIDO`

### 3. Introspection do Banco

Execute o comando para fazer introspection da tabela existente:

```bash
npx prisma db pull
```

Isso irá gerar automaticamente o schema do Prisma baseado na estrutura da sua tabela `clients`.

### 4. Gerar Prisma Client

```bash
npx prisma generate
```

### 5. Executar o Projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
/home/developer/www/kanban/
├── app/
│   ├── api/
│   │   └── clients/           # API Routes para CRUD
│   │       ├── route.ts       # GET e POST
│   │       └── [id]/route.ts  # PATCH e DELETE
│   └── page.tsx               # Página principal do Kanban
├── components/
│   └── kanban/
│       ├── KanbanBoard.tsx    # Componente principal do Kanban
│       ├── KanbanColumn.tsx   # Colunas do Kanban
│       └── ClientCard.tsx     # Cards dos clientes
├── lib/
│   ├── prisma.ts              # Cliente Prisma
│   ├── supabase.ts            # Cliente Supabase
│   └── utils.ts               # Utilitários
├── types/
│   └── client.ts              # TypeScript types
├── prisma/
│   └── schema.prisma          # Schema do Prisma
└── prisma.config.ts           # Configuração do Prisma 7
```

## API Routes

### GET `/api/clients`
Lista todos os clientes (com filtro opcional por status)

**Query params:**
- `status` (opcional): Filtrar por status específico

### POST `/api/clients`
Cria um novo cliente

**Body:** JSON com os dados do cliente

### PATCH `/api/clients/[id]`
Atualiza um cliente existente (incluindo mudança de status)

**Body:** JSON com os campos a atualizar

### DELETE `/api/clients/[id]`
Remove um cliente

## Campos da Tabela `clients`

O Kanban se adapta automaticamente aos campos da sua tabela. Campos esperados:

- `id` (obrigatório) - Identificador único
- `status` (obrigatório) - Status de qualificação
- `name` ou `nome` - Nome do cliente
- `email` - Email
- `telefone` ou `phone` - Telefone
- `empresa` ou `company` - Empresa
- `valor` - Valor estimado
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

## Próximos Passos (Roadmap)

- [ ] Adicionar modal para criar/editar clientes
- [ ] Implementar filtros e busca
- [ ] Adicionar estatísticas e gráficos
- [ ] Implementar autenticação com Supabase Auth
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar paginação para grandes volumes
- [ ] Adicionar notificações toast
- [ ] Exportação de dados (CSV/Excel)

## Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático!

```bash
npm run build  # Testar build localmente
```

## Troubleshooting

**Erro: Module '"@prisma/client"' has no exported member 'PrismaClient'**
- Execute `npx prisma generate` para gerar o Prisma Client

**Erro: Can't reach database server**
- Verifique se a `DATABASE_URL` está correta no `.env`
- Confirme que o IP da sua máquina está autorizado no Supabase

**Clientes não aparecem no Kanban**
- Verifique se a tabela `clients` tem a coluna `status`
- Confirme que existem registros na tabela

## Licença

Desenvolvido por Sandro Servo - https://cloudservo.com.br
