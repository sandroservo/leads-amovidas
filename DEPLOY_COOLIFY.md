# 🚀 Deploy no Coolify - Amo Vidas Kanban

**Autor:** Sandro Servo  
**Site:** https://cloudservo.com.br

## 📋 Pré-requisitos

- Coolify instalado e configurado
- Acesso ao Supabase (URL e ANON_KEY)
- Git repository configurado

## 🐳 Configuração Docker

O projeto está configurado com:
- **Dockerfile** multi-stage (otimizado para produção)
- **docker-compose.yml** para Coolify
- **next.config.ts** com output standalone

## 🔧 Variáveis de Ambiente

Configure as seguintes variáveis no Coolify:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_anon_key_aqui
NODE_ENV=production
```

## 📦 Deploy no Coolify

### Opção 1: Via Git (Recomendado)

1. **Conecte o repositório no Coolify:**
   - Adicione o repositório Git
   - Configure branch: `main` ou `master`

2. **Configure as variáveis de ambiente:**
   - Vá em `Environment Variables`
   - Adicione as variáveis acima

3. **Configure Build:**
   - Build Type: `Dockerfile`
   - Dockerfile Path: `./Dockerfile`
   - Port: `3000`

4. **Deploy:**
   - Clique em `Deploy`
   - Aguarde o build e deploy automático

### Opção 2: Via Docker Compose

1. **Faça upload do projeto:**
   ```bash
   git clone seu-repositorio
   cd kanban
   ```

2. **Crie arquivo `.env`:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br
   NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_anon_key_aqui
   ```

3. **No Coolify:**
   - Selecione `Docker Compose`
   - Aponte para `docker-compose.yml`
   - Configure as variáveis de ambiente

4. **Deploy:**
   ```bash
   docker-compose up -d
   ```

## 🏗️ Build Local (Teste)

Para testar o build Docker localmente:

```bash
# Build da imagem
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_key \
  -t amovidas-kanban .

# Executar container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://supabase.amovidas.com.br \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_key \
  amovidas-kanban
```

Acesse: http://localhost:3000

## 🔍 Healthcheck

O container possui healthcheck configurado:
- Intervalo: 30s
- Timeout: 10s
- Retries: 3
- Start period: 40s

## 📊 Monitoramento

Após o deploy, monitore:
- Logs do container no Coolify
- Status do healthcheck
- Métricas de CPU/RAM
- Conexão com Supabase

## 🔄 Atualizações

Para atualizar o Kanban:

1. **Push para Git:**
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin main
   ```

2. **No Coolify:**
   - O deploy automático será acionado
   - Ou clique em `Redeploy` manualmente

## 🐛 Troubleshooting

### Build falha:
- Verifique se as variáveis de ambiente estão corretas
- Confirme que `output: 'standalone'` está em `next.config.ts`

### Container não inicia:
- Verifique os logs: `docker logs amovidas-kanban`
- Confirme que a porta 3000 está livre

### Erro de conexão com Supabase:
- Verifique URL e ANON_KEY
- Confirme que RLS está desabilitado ou com políticas públicas
- Teste conexão: `curl https://supabase.amovidas.com.br`

## 📝 Estrutura de Arquivos

```
kanban/
├── Dockerfile              # Imagem Docker multi-stage
├── docker-compose.yml      # Orquestração para Coolify
├── .dockerignore          # Arquivos ignorados no build
├── next.config.ts         # Config Next.js (standalone)
└── DEPLOY_COOLIFY.md      # Este arquivo
```

## 🎯 Boas Práticas

- ✅ Use variáveis de ambiente (nunca hardcode credenciais)
- ✅ Monitore logs regularmente
- ✅ Configure backup do Supabase
- ✅ Use HTTPS em produção
- ✅ Atualize dependências regularmente

## 📞 Suporte

**Desenvolvido por:** Sandro Servo  
**Site:** https://cloudservo.com.br  
**Cliente:** Amo Vidas (https://amovidas.com.br)

---

**Versão:** 1.0.0  
**Última atualização:** Dezembro 2025
