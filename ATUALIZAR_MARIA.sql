-- ========================================
-- ATUALIZAR MARIA PARA QUALIFICADO
-- ========================================
-- Maria perguntou sobre idade e parentesco dos dependentes
-- Demonstrou interesse nos benefícios

-- Atualizar Maria
UPDATE clients 
SET 
  status = 'QUALIFICADO',
  qualify = true
WHERE whatsapp LIKE '%559991784257%' 
   OR email LIKE '%559991784257%';

-- Verificar atualização
SELECT 
  id,
  name,
  whatsapp,
  status,
  qualify,
  notes
FROM clients 
WHERE whatsapp LIKE '%559991784257%';
