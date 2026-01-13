/**
 * Autor: Sandro Servo
 * Site: https://cloudservo.com.br
 * 
 * Migration: Adicionar coluna LEADS_FRIOS ao kanban
 * Execute este SQL no Supabase (SQL Editor)
 */

-- Primeiro, remover a constraint antiga
ALTER TABLE clients DROP CONSTRAINT IF EXISTS check_status_values;

-- Adicionar nova constraint com LEADS_FRIOS incluído
ALTER TABLE clients ADD CONSTRAINT check_status_values 
  CHECK (status IN ('NOVO', 'CONTATO_INICIAL', 'QUALIFICADO', 'NEGOCIACAO', 'GANHO', 'PERDIDO', 'LEADS_FRIOS'));
