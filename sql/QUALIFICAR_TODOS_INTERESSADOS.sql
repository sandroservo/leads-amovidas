-- ========================================
-- QUALIFICAR TODOS OS LEADS INTERESSADOS DE UMA VEZ
-- ========================================

-- PASSO 1: Atualizar Nádja especificamente
UPDATE clients 
SET status = 'QUALIFICADO', qualify = true
WHERE whatsapp LIKE '%559999054256%';

-- PASSO 2: Qualificar TODOS com "interessad*" nas notas
UPDATE clients 
SET status = 'QUALIFICADO', qualify = true
WHERE (
  notes ILIKE '%interessad%'
  OR notes ILIKE '%interesse%'
  OR notes ILIKE '%perguntou%'
  OR notes ILIKE '%demonstrou%'
  OR notes ILIKE '%confirmou%'
)
AND status != 'QUALIFICADO';

-- PASSO 3: Verificar quantos foram qualificados
SELECT 
  status,
  COUNT(*) as total
FROM clients 
GROUP BY status 
ORDER BY total DESC;

-- PASSO 4: Ver os leads qualificados
SELECT 
  id,
  name,
  whatsapp,
  LEFT(notes, 80) as notas,
  qualify
FROM clients 
WHERE status = 'QUALIFICADO'
ORDER BY created_at DESC
LIMIT 20;
