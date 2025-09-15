-- Clean up orphaned two-factor functions that reference non-existent tables
-- These functions were left behind when the two_factor_codes table was removed

DROP FUNCTION IF EXISTS public.send_two_factor_code(uuid, text);
DROP FUNCTION IF EXISTS public.verify_two_factor_code(uuid, text, text);
DROP FUNCTION IF EXISTS public.get_latest_otp_for_testing(uuid);

-- Clean up two-factor related columns from profiles table since the functionality is not being used
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS two_factor_enabled,
DROP COLUMN IF EXISTS two_factor_method, 
DROP COLUMN IF EXISTS two_factor_setup_at,
DROP COLUMN IF EXISTS backup_codes;