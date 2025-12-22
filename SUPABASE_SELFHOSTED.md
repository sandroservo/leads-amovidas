# 🏠 Configuração para Supabase Self-Hosted

## Para Supabase Self-Hosted

Como você está usando Supabase self-hosted em `https://supabase.amovidas.com.br`, a configuração é diferente.

## 📝 Configuração do .env

### Opção 1: PostgreSQL Exposto Externamente

Se o PostgreSQL do seu Supabase self-hosted está exposto na porta 5432:

```env
DATABASE_URL="postgresql://postgres:[SENHA]@supabase.amovidas.com.br:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

### Opção 2: PostgreSQL em Localhost

Se você está rodando o Kanban na mesma máquina que o Supabase:

```env
DATABASE_URL="postgresql://postgres:[SENHA]@localhost:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

### Opção 3: PostgreSQL com IP Específico

Se você conhece o IP do servidor PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:[SENHA]@192.168.x.x:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

## 🔍 Como Descobrir o Host do PostgreSQL

### Se está usando Docker Compose:

1. Localize o arquivo `docker-compose.yml` do Supabase
2. Procure pelo serviço `db` ou `postgres`
3. Verifique a porta exposta (geralmente `5432:5432`)

Exemplo:
```yaml
db:
  image: supabase/postgres:...
  ports:
    - "5432:5432"  # <-- Porta exposta
```

### Testar Conexão (via psql ou outro cliente):

```bash
psql -h supabase.amovidas.com.br -p 5432 -U postgres -d postgres
# ou
psql -h localhost -p 5432 -U postgres -d postgres
```

## 🔐 Descobrir a Senha do PostgreSQL

A senha do PostgreSQL está configurada no seu Supabase self-hosted.

### No Docker Compose:

Procure por:
```yaml
db:
  environment:
    POSTGRES_PASSWORD: sua-senha-aqui
```

### Ou nas variáveis de ambiente:

```bash
grep POSTGRES_PASSWORD .env
# ou
grep DB_PASSWORD .env
```

## 📊 Portas Comuns

**Supabase Self-Hosted geralmente usa:**
- **API/Studio:** Porta 8000 ou 3000 (HTTPS/HTTP)
- **PostgreSQL:** Porta 5432
- **PostgREST:** Porta 3000

## ✅ Testar Configuração

Depois de configurar o `.env`, teste:

```bash
# Testar conexão
npx prisma db pull

# Se funcionar, verá:
# ✔ Introspected 1 model...
```

## 🎯 Exemplo Completo para Self-Hosted

```env
# PostgreSQL direto (mesma máquina ou rede local)
DATABASE_URL="postgresql://postgres:sua-senha-postgres@localhost:5432/postgres"

# Ou se exposto externamente
DATABASE_URL="postgresql://postgres:sua-senha-postgres@supabase.amovidas.com.br:5432/postgres"

# API do Supabase (para autenticação futura)
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQyMjYwMCwiZXhwIjo0OTIxMDk2MjAwLCJyb2xlIjoiYW5vbiJ9.knBb11axSAbaHnhvl864G7jCjF6AWMvuUey2tsfo5ck
```

## 🐛 Troubleshooting

**Erro: Can't reach database server**
→ Verifique se a porta 5432 está acessível
→ Confirme o host (localhost vs IP vs domínio)
→ Verifique firewall/iptables

**Erro: Authentication failed**
→ Confirme a senha do PostgreSQL
→ Verifique se o usuário é `postgres`

**Erro: Connection refused**
→ PostgreSQL não está rodando ou não está exposto
→ Verifique o Docker Compose ou serviço do PostgreSQL

## 📞 Me Ajude a Ajudar Você

Me diga:
1. Você está rodando o Kanban na **mesma máquina** que o Supabase?
2. Qual a **senha do PostgreSQL** do seu Supabase self-hosted?
3. A porta **5432** está exposta externamente?

Com essas informações, posso te dar a `DATABASE_URL` exata!
