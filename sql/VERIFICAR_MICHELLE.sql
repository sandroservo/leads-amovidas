-- ========================================
-- VERIFICAR CLIENTE MICHELLE
-- ========================================

-- Buscar a cliente Michelle pelo WhatsApp
SELECT 
  id, 
  name, 
  email, 
  whatsapp,
  status, 
  qualify,
  created_at
FROM clients 
WHERE whatsapp LIKE '%559884511259%' 
   OR email LIKE '%559884511259%'
   OR name ILIKE '%michelle%';

-- ========================================
-- ATUALIZAR STATUS PARA QUALIFICADO
-- ========================================

-- Se ela deve estar em "Qualificado", execute:
UPDATE clients 
SET status = 'QUALIFICADO', qualify = true
WHERE whatsapp LIKE '%559884511259%' 
   OR email LIKE '%559884511259%';

-- ========================================
-- VERIFICAR TODOS OS QUALIFICADOS
-- ========================================

-- Ver todos que têm qualify = true
SELECT 
  id,
  name,
  email,
  whatsapp,
  status,
  qualify
FROM clients 
WHERE qualify = true
LIMIT 20;

-- ========================================
-- NORMALIZAR: qualify = true → status = QUALIFICADO
-- ========================================

-- Garantir que TODOS com qualify = true tenham status QUALIFICADO
UPDATE clients 
SET status = 'QUALIFICADO'
WHERE qualify = true AND status != 'QUALIFICADO';

-- Ver quantos foram atualizados
SELECT COUNT(*) as atualizados
FROM clients 
WHERE qualify = true AND status = 'QUALIFICADO';
