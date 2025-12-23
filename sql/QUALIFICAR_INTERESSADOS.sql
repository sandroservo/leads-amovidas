-- ========================================
-- QUALIFICAR LEADS COM INTERESSE
-- ========================================

-- PASSO 1: Atualizar Fabiana especificamente
UPDATE clients 
SET 
  status = 'QUALIFICADO',
  qualify = true
WHERE whatsapp LIKE '%559991406145%' 
   OR email LIKE '%559991406145%';

-- Verificar Fabiana
SELECT id, name, whatsapp, status, qualify, notes
FROM clients 
WHERE whatsapp LIKE '%559991406145%';


-- ========================================
-- PASSO 2: Ver TODOS com "interesse" nas notas
-- ========================================

SELECT 
  id,
  name,
  whatsapp,
  status,
  qualify,
  LEFT(notes, 100) as notas_resumo
FROM clients 
WHERE notes ILIKE '%interesse%'
   OR notes ILIKE '%interessad%'
   OR notes ILIKE '%interessou%'
ORDER BY created_at DESC;


-- ========================================
-- PASSO 3: Qualificar TODOS com interesse nas notas
-- ========================================

-- ATENÇÃO: Isso vai atualizar todos que têm "interesse" nas notas
-- Revise os resultados do PASSO 2 antes de executar!

UPDATE clients 
SET 
  status = 'QUALIFICADO',
  qualify = true
WHERE (
  notes ILIKE '%demonstrou interesse%'
  OR notes ILIKE '%interessad%'
  OR notes ILIKE '%tem interesse%'
  OR notes ILIKE '%mostrou interesse%'
)
AND status != 'QUALIFICADO';

-- Verificar quantos foram atualizados
SELECT COUNT(*) as total_qualificados
FROM clients 
WHERE status = 'QUALIFICADO';


-- ========================================
-- PASSO 4: Ver distribuição final
-- ========================================

SELECT 
  status,
  COUNT(*) as total,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM clients), 1) as percentual
FROM clients 
GROUP BY status 
ORDER BY total DESC;


-- ========================================
-- PASSO 5: Ver alguns leads qualificados
-- ========================================

SELECT 
  id,
  name,
  whatsapp,
  LEFT(notes, 80) as notas,
  qualify
FROM clients 
WHERE status = 'QUALIFICADO'
ORDER BY created_at DESC
LIMIT 10;
