-- Remove unused wallet-related columns from profiles table
-- These are not being used in the UI and could cause confusion

ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS wallet_balance,
DROP COLUMN IF EXISTS ts_balance;

-- Clean up the wallet update trigger that's no longer needed
DROP TRIGGER IF EXISTS update_wallet_balance_trigger ON public.transactions;
DROP FUNCTION IF EXISTS public.update_wallet_balance();