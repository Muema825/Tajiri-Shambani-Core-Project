-- Fix security definer views by recreating them as security invoker

-- Drop and recreate secure_transaction_summaries view
DROP VIEW IF EXISTS public.secure_transaction_summaries;
CREATE VIEW public.secure_transaction_summaries 
WITH (security_invoker = true) AS
SELECT 
    id,
    type,
    status,
    created_at,
    amount
FROM public.transactions
WHERE user_id = auth.uid() AND auth.uid() IS NOT NULL;

-- Drop and recreate transaction_summaries view  
DROP VIEW IF EXISTS public.transaction_summaries;
CREATE VIEW public.transaction_summaries
WITH (security_invoker = true) AS
SELECT 
    id,
    user_id,
    type,
    status,
    created_at,
    CASE
        WHEN type = ANY (ARRAY['deposit'::text, 'withdrawal'::text]) THEN
        CASE
            WHEN user_id = auth.uid() THEN amount
            ELSE NULL::numeric
        END
        ELSE amount
    END AS amount,
    CASE
        WHEN type = ANY (ARRAY['deposit'::text, 'withdrawal'::text]) THEN 'financial'::text
        ELSE 'system'::text
    END AS category
FROM public.transactions
WHERE user_id = auth.uid();