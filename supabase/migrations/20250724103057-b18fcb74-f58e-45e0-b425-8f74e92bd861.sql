-- Enable realtime for the spaces table
ALTER TABLE public.spaces REPLICA IDENTITY FULL;

-- Add the spaces table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.spaces;