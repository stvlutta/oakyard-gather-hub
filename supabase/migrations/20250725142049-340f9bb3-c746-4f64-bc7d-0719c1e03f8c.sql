-- Enable realtime for spaces table
ALTER TABLE public.spaces REPLICA IDENTITY FULL;

-- Add spaces table to realtime publication  
ALTER PUBLICATION supabase_realtime ADD TABLE public.spaces;