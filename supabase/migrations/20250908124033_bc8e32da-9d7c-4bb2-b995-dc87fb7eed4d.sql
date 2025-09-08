-- Fix security definer and search path issues

-- 1. Update functions to have secure search_path settings
-- First, fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = '';

-- 2. Fix the handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = '';

-- 3. Fix the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, username, phone, role)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'role'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 4. Fix the initialize_user_tokens function  
CREATE OR REPLACE FUNCTION public.initialize_user_tokens()
RETURNS TRIGGER AS $$
BEGIN
  -- Set a temporary configuration to allow the insert
  PERFORM set_config('app.initializing_user_tokens', 'true', true);
  
  INSERT INTO public.user_tokens (user_id, balance, locked_balance, total_earned, conversion_rate)
  VALUES (NEW.id, 0, 0, 0, 100.0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Reset the configuration
  PERFORM set_config('app.initializing_user_tokens', 'false', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 5. Fix the update_wallet_balance function
CREATE OR REPLACE FUNCTION public.update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    IF NEW.type IN ('deposit', 'return') THEN
      UPDATE public.profiles 
      SET wallet_balance = wallet_balance + NEW.amount
      WHERE id = NEW.user_id;
    ELSIF NEW.type IN ('withdrawal', 'investment', 'fee') THEN
      UPDATE public.profiles 
      SET wallet_balance = wallet_balance - NEW.amount
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = '';

-- 6. Fix the handle_project_status_update function
CREATE OR REPLACE FUNCTION public.handle_project_status_update()
RETURNS TRIGGER AS $$
DECLARE
  admin_profile RECORD;
BEGIN
  -- Get admin profile information
  SELECT first_name, last_name INTO admin_profile
  FROM public.profiles 
  WHERE id = NEW.admin_id;
  
  -- Set admin_name when admin_id is present
  IF NEW.admin_id IS NOT NULL AND admin_profile IS NOT NULL THEN
    NEW.admin_name = admin_profile.first_name || ' ' || admin_profile.last_name;
  END IF;
  
  -- Set approved_at when status changes to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    NEW.approved_at = now();
    NEW.denied_at = NULL;
    -- Add to action history
    NEW.action_history = COALESCE(OLD.action_history, '[]'::jsonb) || 
      jsonb_build_object(
        'action', 'approved',
        'admin_id', NEW.admin_id,
        'admin_name', NEW.admin_name,
        'timestamp', now(),
        'feedback', NEW.admin_feedback
      );
  END IF;
  
  -- Set denied_at when status changes to 'denied'
  IF NEW.status = 'denied' AND OLD.status != 'denied' THEN
    NEW.denied_at = now();
    NEW.approved_at = NULL;
    -- Add to action history
    NEW.action_history = COALESCE(OLD.action_history, '[]'::jsonb) || 
      jsonb_build_object(
        'action', 'denied',
        'admin_id', NEW.admin_id,
        'admin_name', NEW.admin_name,
        'timestamp', now(),
        'feedback', NEW.admin_feedback
      );
  END IF;
  
  -- Clear both timestamps if status changes to 'pending'
  IF NEW.status = 'pending' AND OLD.status != 'pending' THEN
    NEW.approved_at = NULL;
    NEW.denied_at = NULL;
    -- Add to action history
    NEW.action_history = COALESCE(OLD.action_history, '[]'::jsonb) || 
      jsonb_build_object(
        'action', 'reset_to_pending',
        'admin_id', NEW.admin_id,
        'admin_name', NEW.admin_name,
        'timestamp', now(),
        'feedback', 'Project reset for re-review'
      );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = '';

-- 7. Fix the update_platform_settings_timestamp function
CREATE OR REPLACE FUNCTION public.update_platform_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = '';

-- 8. Update remaining SECURITY DEFINER functions that need to keep elevated privileges
-- but add proper search_path protection

CREATE OR REPLACE FUNCTION public.log_transaction_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Log any transaction status changes
  INSERT INTO public.security_events (
    event_type,
    severity,
    details,
    user_id
  ) VALUES (
    'transaction_updated',
    'medium',
    jsonb_build_object(
      'transaction_id', NEW.id,
      'old_status', OLD.status,
      'new_status', NEW.status,
      'amount', NEW.amount,
      'type', NEW.type
    ),
    NEW.user_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.log_transaction_security_event()
RETURNS TRIGGER AS $$
BEGIN
  -- Log unauthorized access attempts
  IF auth.uid() IS NULL AND TG_OP IN ('INSERT', 'UPDATE', 'DELETE') THEN
    INSERT INTO public.security_events (
      event_type,
      severity,
      details,
      user_id,
      ip_address
    ) VALUES (
      'unauthorized_transaction_access',
      'high',
      jsonb_build_object(
        'table', 'transactions',
        'operation', TG_OP,
        'timestamp', now()
      ),
      NULL,
      inet_client_addr()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.update_user_token_balance(p_user_id uuid, p_balance_change numeric, p_total_earned_change numeric DEFAULT 0, p_transaction_id uuid DEFAULT NULL::uuid)
RETURNS BOOLEAN AS $$
DECLARE
  current_balance NUMERIC;
BEGIN
  -- Verify this is called from a service role (edge function)
  IF (auth.jwt() ->> 'role') != 'service_role' THEN
    RAISE EXCEPTION 'Access denied: Service role required';
  END IF;
  
  -- Verify user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;
  
  -- Get current balance to prevent negative balances
  SELECT balance INTO current_balance 
  FROM public.user_tokens 
  WHERE user_id = p_user_id;
  
  -- Prevent negative balance (except for locked balance operations)
  IF (current_balance + p_balance_change) < 0 THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;
  
  -- Update the balance
  UPDATE public.user_tokens
  SET 
    balance = balance + p_balance_change,
    total_earned = total_earned + GREATEST(p_total_earned_change, 0),
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Log the transaction if transaction_id provided
  IF p_transaction_id IS NOT NULL THEN
    INSERT INTO public.admin_activity_logs (
      admin_id, action, target_type, target_id, details
    ) VALUES (
      p_user_id, 'token_balance_updated', 'user_tokens', p_user_id,
      jsonb_build_object(
        'balance_change', p_balance_change,
        'total_earned_change', p_total_earned_change,
        'transaction_id', p_transaction_id
      )
    );
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 9. Add secure search path to other security definer functions
CREATE OR REPLACE FUNCTION public.get_latest_otp_for_testing(p_user_id uuid)
RETURNS TEXT AS $$
DECLARE
  latest_code text;
BEGIN
  -- Only allow this in development/testing
  SELECT code INTO latest_code
  FROM public.two_factor_codes
  WHERE user_id = p_user_id 
    AND code_type = 'login_verification'
    AND expires_at > now()
    AND used_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1;
  
  RETURN latest_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.get_platform_setting(setting_key text)
RETURNS JSONB AS $$
DECLARE
  setting_value JSONB;
BEGIN
  SELECT value INTO setting_value
  FROM public.platform_settings
  WHERE key = setting_key;
  
  RETURN setting_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.generate_backup_codes()
RETURNS TEXT[] AS $$
DECLARE
  codes text[] := '{}';
  i integer;
  code text;
BEGIN
  FOR i IN 1..8 LOOP
    code := upper(substring(md5(random()::text) from 1 for 8));
    codes := array_append(codes, code);
  END LOOP;
  
  RETURN codes;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.update_platform_setting(setting_key text, setting_value jsonb, admin_id uuid)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = admin_id AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  -- Update or insert setting
  INSERT INTO public.platform_settings (key, value)
  VALUES (setting_key, setting_value)
  ON CONFLICT (key) 
  DO UPDATE SET value = setting_value, updated_at = now();
  
  -- Log the activity
  PERFORM log_admin_activity(
    admin_id,
    'update_platform_setting',
    'setting',
    NULL,
    jsonb_build_object('key', setting_key, 'value', setting_value)
  );
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.log_admin_activity(p_admin_id uuid, p_action text, p_target_type text DEFAULT NULL::text, p_target_id uuid DEFAULT NULL::uuid, p_details jsonb DEFAULT NULL::jsonb)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.admin_activity_logs (
    admin_id, action, target_type, target_id, details
  ) VALUES (
    p_admin_id, p_action, p_target_type, p_target_id, p_details
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.send_two_factor_code(p_user_id uuid, p_method text DEFAULT 'sms'::text)
RETURNS UUID AS $$
DECLARE
  code_id uuid;
  verification_code text;
  user_phone text;
  user_email text;
BEGIN
  -- Generate 6-digit code
  verification_code := lpad(floor(random() * 1000000)::text, 6, '0');
  
  -- Log the OTP for testing purposes (remove when Twilio is integrated)
  RAISE NOTICE 'OTP for user %: %', p_user_id, verification_code;
  
  -- Insert code into database
  INSERT INTO public.two_factor_codes (
    user_id, code, code_type, expires_at
  ) VALUES (
    p_user_id, verification_code, 'login_verification', now() + interval '10 minutes'
  ) RETURNING id INTO code_id;
  
  -- Get user contact info - fix ambiguous column references
  SELECT p.phone, u.email INTO user_phone, user_email
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE p.id = p_user_id;
  
  -- Log the 2FA attempt
  PERFORM log_admin_activity(
    p_user_id,
    'two_factor_code_sent',
    'authentication',
    null,
    jsonb_build_object('method', p_method, 'code_id', code_id)
  );
  
  RETURN code_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.verify_two_factor_code(p_user_id uuid, p_code text, p_device_fingerprint text DEFAULT NULL::text)
RETURNS BOOLEAN AS $$
DECLARE
  valid_code boolean := false;
  code_record record;
BEGIN
  -- Check for valid unused code
  SELECT * INTO code_record
  FROM public.two_factor_codes
  WHERE user_id = p_user_id 
    AND code = p_code 
    AND expires_at > now()
    AND used_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF FOUND THEN
    -- Mark code as used
    UPDATE public.two_factor_codes
    SET used_at = now()
    WHERE id = code_record.id;
    
    valid_code := true;
    
    -- Add trusted device if fingerprint provided
    IF p_device_fingerprint IS NOT NULL THEN
      INSERT INTO public.trusted_devices (
        user_id, device_fingerprint, trusted_until
      ) VALUES (
        p_user_id, p_device_fingerprint, now() + interval '30 days'
      ) ON CONFLICT (user_id, device_fingerprint) DO UPDATE SET
        trusted_until = now() + interval '30 days',
        last_used_at = now();
    END IF;
    
    -- Log successful verification
    PERFORM log_admin_activity(
      p_user_id,
      'two_factor_verified',
      'authentication',
      null,
      jsonb_build_object('code_id', code_record.id, 'trusted_device', p_device_fingerprint IS NOT NULL)
    );
  ELSE
    -- Log failed verification
    PERFORM log_admin_activity(
      p_user_id,
      'two_factor_failed',
      'authentication',
      null,
      jsonb_build_object('attempted_code', p_code)
    );
  END IF;
  
  RETURN valid_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';