-- ========================================
-- ATUALIZAR MICHELLE PARA QUALIFICADO
-- ========================================
-- ID: 169
-- Status atual: NOVO
-- Qualify atual: false
-- Necessário: QUALIFICADO + qualify = true

-- Atualizar Michelle especificamente
UPDATE clients 
SET 
  status = 'QUALIFICADO',
  qualify = true
WHERE id = 169;

-- Verificar se foi atualizado
SELECT 
  id, 
  name, 
  whatsapp,
  status, 
  qualify
FROM clients 
WHERE id = 169;

-- ========================================
-- Se houver OUTROS clientes que deveriam estar qualificados
-- ========================================

-- Ver todos que estão NOVO mas deveriam estar QUALIFICADO
-- (ajuste a condição conforme sua lógica de negócio)
SELECT 
  id,
  name,
  email,
  whatsapp,
  status,
  qualify,
  notes
FROM clients 
WHERE status = 'NOVO' 
  AND (
    notes ILIKE '%interessad%' 
    OR notes ILIKE '%qualificad%'
  )
LIMIT 20;

-- Se necessário, atualizar outros em massa
-- Descomente e ajuste conforme necessário:
-- UPDATE clients 
-- SET status = 'QUALIFICADO', qualify = true
-- WHERE notes ILIKE '%interessad%' AND status != 'QUALIFICADO';
