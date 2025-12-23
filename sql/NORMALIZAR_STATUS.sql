-- ========================================
-- NORMALIZAR STATUS - Mapear valores customizados
-- ========================================

-- PASSO 1: Ver todos os valores de status atuais
-- Execute isso primeiro para ver o que existe:
SELECT DISTINCT status, COUNT(*) as total 
FROM clients 
GROUP BY status 
ORDER BY total DESC;

-- ========================================
-- PASSO 2: Normalizar valores para os 6 status do Kanban
-- ========================================

-- Mapear "interessados" e "interessada" para "CONTATO_INICIAL" ou "QUALIFICADO"
UPDATE clients 
SET status = 'CONTATO_INICIAL'
WHERE LOWER(status) IN ('interessados', 'interessada', 'interessado', 'interesse');

-- Outros mapeamentos comuns (ajuste conforme necessário):
UPDATE clients 
SET status = 'NOVO'
WHERE LOWER(status) IN ('novo', 'lead', 'prospect', 'cold', 'frio', '');

UPDATE clients 
SET status = 'CONTATO_INICIAL'
WHERE LOWER(status) IN ('contato', 'primeiro contato', 'contacted', 'em contato');

UPDATE clients 
SET status = 'QUALIFICADO'
WHERE LOWER(status) IN ('qualificado', 'qualified', 'hot', 'quente', 'interessado');

UPDATE clients 
SET status = 'NEGOCIACAO'
WHERE LOWER(status) IN ('negociacao', 'negociação', 'proposta', 'proposal', 'negotiating');

UPDATE clients 
SET status = 'GANHO'
WHERE LOWER(status) IN ('ganho', 'won', 'cliente', 'customer', 'fechado', 'convertido');

UPDATE clients 
SET status = 'PERDIDO'
WHERE LOWER(status) IN ('perdido', 'lost', 'descartado', 'rejected', 'não interessado');

-- Qualquer status NULL ou vazio = NOVO
UPDATE clients 
SET status = 'NOVO'
WHERE status IS NULL OR TRIM(status) = '';

-- ========================================
-- PASSO 3: Garantir que todos estão em maiúsculas
-- ========================================
UPDATE clients 
SET status = UPPER(status)
WHERE status != UPPER(status);

-- ========================================
-- PASSO 4: Remover constraint antigo e adicionar novo
-- ========================================
ALTER TABLE clients DROP CONSTRAINT IF EXISTS check_status_values;
ALTER TABLE clients ADD CONSTRAINT check_status_values 
  CHECK (status IN ('NOVO', 'CONTATO_INICIAL', 'QUALIFICADO', 'NEGOCIACAO', 'GANHO', 'PERDIDO'));

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================
-- Ver distribuição final dos leads por status
SELECT 
  status, 
  COUNT(*) as total,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM clients), 2) as percentual
FROM clients 
GROUP BY status 
ORDER BY total DESC;

-- Ver alguns exemplos de cada status
SELECT status, name, email, qualify 
FROM clients 
WHERE status IS NOT NULL
ORDER BY status, created_at DESC
LIMIT 20;
