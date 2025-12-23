-- Migration para adicionar coluna status na tabela clients
-- Execute este SQL no seu Supabase (SQL Editor)

-- Adicionar coluna status
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'NOVO';

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

-- Atualizar registros existentes baseado no campo qualify
-- qualify = true -> QUALIFICADO
-- qualify = false -> NOVO
UPDATE clients 
SET status = CASE 
  WHEN qualify = true THEN 'QUALIFICADO'
  ELSE 'NOVO'
END
WHERE status = 'NOVO';

-- Adicionar constraint para validar valores de status
ALTER TABLE clients ADD CONSTRAINT check_status_values 
  CHECK (status IN ('NOVO', 'CONTATO_INICIAL', 'QUALIFICADO', 'NEGOCIACAO', 'GANHO', 'PERDIDO'));
