# 🔧 Como Corrigir a DATABASE_URL

## ❌ Problema
Você está usando a URL da API: `https://supabase.amovidas.com.br`
Mas precisa da CONNECTION STRING do PostgreSQL!

## ✅ Solução Passo a Passo

### 1. Acessar Supabase Dashboard

Vá para: https://supabase.com/dashboard

### 2. Selecionar seu Projeto

Clique no projeto que contém a tabela `clients`

### 3. Ir para Configurações do Banco

1. Clique no ícone **⚙️ Settings** (engrenagem) no canto inferior esquerdo
2. No menu lateral, clique em **Database**

### 4. Localizar Connection String

Role a página até encontrar a seção **Connection string**

Você verá 3 abas:
- **URI** ← Use esta!
- Pooler
- Session

### 5. Selecionar Modo Transaction

Dentro da aba **URI**, selecione o modo **Transaction**

### 6. Copiar a Connection String

A string terá este formato:

```
postgresql://postgres.xxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**OU** este formato (modo direto):

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxx.supabase.co:5432/postgres
```

### 7. Substituir no `.env`

Abra o arquivo `.env` e cole a connection string:

```env
DATABASE_URL="postgresql://postgres.xxxxxx:[SUA-SENHA-AQUI]@db.xxxxx.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

**IMPORTANTE:** 
- Substitua `[YOUR-PASSWORD]` pela senha real do seu banco PostgreSQL
- A senha do banco pode ser diferente da senha da sua conta Supabase

### 8. Se Esqueceu a Senha do Banco

Se você não lembra a senha do PostgreSQL:

1. No Supabase Dashboard → **Settings** → **Database**
2. Role até **Database password**
3. Clique em **Reset database password**
4. Copie a nova senha
5. Atualize a connection string no `.env`

### 9. Testar Conexão

Depois de configurar o `.env`, execute:

```bash
npx prisma db pull
```

**Sucesso:**
```
✔ Introspected 1 model and wrote it into prisma/schema.prisma
```

**Erro ainda?**
- Verifique se copiou a connection string completa
- Confirme que a senha está correta
- Verifique se seu IP está autorizado no Supabase

### 10. Formato Correto da DATABASE_URL

✅ **CORRETO:**
```
postgresql://postgres.abc123:sua-senha@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

❌ **ERRADO (API URL):**
```
https://supabase.amovidas.com.br
```

❌ **ERRADO (sem protocolo):**
```
supabase.amovidas.com.br:5432/postgres
```

## 📞 Precisa de Ajuda?

Se continuar com erro, me envie:
1. A primeira parte da connection string (sem a senha): `postgresql://postgres.xxxxx:****@...`
2. A mensagem de erro completa

Assim posso identificar o problema específico!
