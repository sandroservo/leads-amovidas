-- ========================================
-- SINCRONIZAR CAMPO QUALIFY COM STATUS
-- ========================================

-- Garantir que todos com status QUALIFICADO tenham qualify = true
UPDATE clients 
SET qualify = true
WHERE status = 'QUALIFICADO' AND qualify = false;

-- Verificar Nádja especificamente
SELECT id, name, whatsapp, status, qualify
FROM clients 
WHERE whatsapp LIKE '%559999054256%';

-- Ver quantos foram atualizados
SELECT 
  status,
  qualify,
  COUNT(*) as total
FROM clients 
GROUP BY status, qualify
ORDER BY status, qualify;
