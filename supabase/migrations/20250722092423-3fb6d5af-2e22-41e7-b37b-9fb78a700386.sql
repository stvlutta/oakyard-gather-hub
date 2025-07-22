-- Update the existing profile to have admin role if it's the right user
-- We'll set the first user as admin for demo purposes
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'stvlutta@gmail.com'
  LIMIT 1
);

-- Create a function to promote a user to admin
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Find the user by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Update their profile role
  UPDATE public.profiles
  SET role = 'admin'
  WHERE user_id = target_user_id;
  
  RETURN true;
END;
$$;