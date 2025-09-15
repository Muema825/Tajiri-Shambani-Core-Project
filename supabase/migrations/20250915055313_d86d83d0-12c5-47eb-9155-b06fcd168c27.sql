-- Fix potential infinite recursion in admin policies by ensuring we use security definer functions
-- and fix missing RLS policies

-- 1. Ensure the get_current_user_role function is properly secured
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE 
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 2. Fix profiles table policies to prevent infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- 3. Strengthen transaction security policies
DROP POLICY IF EXISTS "secure_transaction_insert" ON public.transactions;
DROP POLICY IF EXISTS "secure_transaction_select" ON public.transactions;  
DROP POLICY IF EXISTS "secure_transaction_update" ON public.transactions;

CREATE POLICY "Users can create their own transactions"
ON public.transactions 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  auth.uid() IS NOT NULL AND 
  amount > 0 AND 
  type IS NOT NULL AND 
  status = 'pending'
);

CREATE POLICY "Users can view their own transactions"
ON public.transactions 
FOR SELECT 
USING (
  auth.uid() = user_id AND 
  auth.uid() IS NOT NULL
);

CREATE POLICY "System can update transactions"
ON public.transactions 
FOR UPDATE 
USING (
  status = 'pending' AND 
  (auth.jwt() ->> 'role') = 'service_role'
)
WITH CHECK (
  status IN ('completed', 'failed', 'cancelled') AND 
  user_id = user_id AND 
  amount = amount AND 
  type = type
);

-- 4. Ensure security_events table has proper admin-only access
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view security events" ON public.security_events;

CREATE POLICY "Admins can view security events"
ON public.security_events 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- 5. Add missing policies for user_tokens table to prevent unauthorized access
CREATE POLICY "Admins can view all token balances"
ON public.user_tokens 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');