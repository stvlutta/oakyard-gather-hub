-- Create spaces table
CREATE TABLE public.spaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  hourly_rate INTEGER NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 1,
  category TEXT NOT NULL DEFAULT 'meeting-room',
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  owner_id UUID,
  owner_name TEXT,
  rating DECIMAL(2,1) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  availability JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;

-- Create policies for spaces
CREATE POLICY "Spaces are viewable by everyone" 
ON public.spaces 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create spaces" 
ON public.spaces 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own spaces" 
ON public.spaces 
FOR UPDATE 
TO authenticated
USING (auth.uid()::text = owner_id::text);

CREATE POLICY "Users can delete their own spaces" 
ON public.spaces 
FOR DELETE 
TO authenticated
USING (auth.uid()::text = owner_id::text);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_spaces_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_spaces_updated_at
BEFORE UPDATE ON public.spaces
FOR EACH ROW
EXECUTE FUNCTION public.update_spaces_updated_at();

-- Insert some initial data
INSERT INTO public.spaces (title, description, location, hourly_rate, capacity, category, amenities, images, owner_name, rating, reviews) VALUES
('Modern Conference Room', 'A sleek, modern conference room perfect for business meetings and presentations. Features state-of-the-art AV equipment, comfortable seating for up to 12 people, and floor-to-ceiling windows with city views.', 'Downtown Business District, 123 Main St', 7500, 12, 'meeting-room', ARRAY['WiFi', 'Projector', 'Whiteboard', 'Coffee Machine', 'Air Conditioning'], ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'], 'John Doe', 4.8, 24),
('Creative Art Studio', 'Inspiring creative space with natural light and artistic atmosphere. Perfect for workshops, art classes, photography sessions, and creative collaborations. Includes art supplies and flexible workspace.', 'Arts Quarter, 456 Creative Ave', 5000, 8, 'creative-studio', ARRAY['Natural Light', 'Art Supplies', 'WiFi', 'Storage', 'Easels'], ARRAY['https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop'], 'Sarah Johnson', 4.9, 18),
('Elegant Event Hall', 'Sophisticated event space ideal for corporate gatherings, celebrations, and special occasions. Features beautiful lighting, catering facilities, and can accommodate large groups with style.', 'Event Center, 789 Celebration Blvd', 15000, 100, 'event-hall', ARRAY['Catering Kitchen', 'Sound System', 'Stage', 'Bar Area', 'Parking'], ARRAY['https://images.unsplash.com/photo-1519167758481-83f29ba5d4a6?w=800&h=600&fit=crop'], 'John Doe', 4.7, 31);