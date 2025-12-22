-- ========================================
-- SOLUÇÃO: Permitir acesso à tabela clients
-- ========================================
-- Há 181 clientes no banco, mas RLS está bloqueando o acesso

-- OPÇÃO 1: DESABILITAR RLS (Mais Rápido - Recomendado para desenvolvimento)
-- ========================================
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;


-- OPÇÃO 2: MANTER RLS COM POLÍTICAS PÚBLICAS (Recomendado para produção)
-- ========================================
-- Descomente as linhas abaixo se preferir manter RLS:

-- ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- -- Permitir SELECT (leitura)
-- DROP POLICY IF EXISTS "Permitir leitura pública" ON clients;
-- CREATE POLICY "Permitir leitura pública" ON clients
--   FOR SELECT USING (true);

-- -- Permitir UPDATE (atualização)
-- DROP POLICY IF EXISTS "Permitir atualização pública" ON clients;
-- CREATE POLICY "Permitir atualização pública" ON clients
--   FOR UPDATE USING (true);

-- -- Permitir INSERT (criação)
-- DROP POLICY IF EXISTS "Permitir inserção pública" ON clients;
-- CREATE POLICY "Permitir inserção pública" ON clients
--   FOR INSERT WITH CHECK (true);

-- -- Permitir DELETE (exclusão)
-- DROP POLICY IF EXISTS "Permitir exclusão pública" ON clients;
-- CREATE POLICY "Permitir exclusão pública" ON clients
--   FOR DELETE USING (true);


-- ========================================
-- ADICIONAR COLUNA STATUS (se ainda não existe)
-- ========================================
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'NOVO';

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

-- Atualizar registros existentes baseado no campo qualify
UPDATE clients 
SET status = CASE 
  WHEN qualify = true THEN 'QUALIFICADO'
  ELSE 'NOVO'
END
WHERE status IS NULL OR status = '';

-- Adicionar constraint de validação
ALTER TABLE clients DROP CONSTRAINT IF EXISTS check_status_values;
ALTER TABLE clients ADD CONSTRAINT check_status_values 
  CHECK (status IN ('NOVO', 'CONTATO_INICIAL', 'QUALIFICADO', 'NEGOCIACAO', 'GANHO', 'PERDIDO'));


-- ========================================
-- VERIFICAÇÃO
-- ========================================
-- Após executar o SQL acima, execute isso para confirmar:

-- Ver 5 clientes com status
SELECT id, name, email, status FROM clients LIMIT 5;

-- Contar clientes por status
SELECT status, COUNT(*) FROM clients GROUP BY status;
