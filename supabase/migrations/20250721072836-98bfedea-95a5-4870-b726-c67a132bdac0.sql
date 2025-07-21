-- Temporarily allow public inserts for spaces (for admin functionality)
-- We'll update this later when proper auth is integrated

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can create spaces" ON public.spaces;

-- Create a more permissive policy for now
CREATE POLICY "Anyone can create spaces temporarily" 
ON public.spaces 
FOR INSERT 
WITH CHECK (true);

-- Also ensure the owner_id field can be null
ALTER TABLE public.spaces ALTER COLUMN owner_id DROP NOT NULL;