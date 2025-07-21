import { createClient } from '@supabase/supabase-js';

// Create Supabase client directly
const supabase = createClient(
  'https://bgvhqdpyoetjqcrralak.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJndmhxZHB5b2V0anFjcnJhbGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjE3ODYsImV4cCI6MjA2ODEzNzc4Nn0.xFlcB4zS_hXd8N6yF90q5Ko3-ATyLfMoRb3jx6HK0iU'
);

export const spacesApi = {
  // Get all spaces
  async getSpaces() {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Convert snake_case to camelCase for frontend
      const spacesData = (data || []).map(space => ({
        id: space.id,
        title: space.title,
        description: space.description,
        location: space.location,
        hourlyRate: space.hourly_rate, // Convert snake_case to camelCase
        capacity: space.capacity,
        category: space.category,
        amenities: space.amenities || [],
        images: space.images || [],
        ownerId: space.owner_id,
        ownerName: space.owner_name,
        rating: space.rating,
        reviews: space.reviews,
        availability: space.availability || {}
      }));
      
      return spacesData;
    } catch (error) {
      console.error('Error fetching spaces:', error);
      // Return empty array on error to prevent UI crashes
      return [];
    }
  },

  // Get single space
  async getSpace(id) {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching space:', error);
      throw error;
    }
  },

  // Create new space
  async createSpace(spaceData) {
    try {
      console.log('Creating space with data:', spaceData);
      
      // Convert camelCase to snake_case for database
      const newSpace = {
        title: spaceData.title,
        description: spaceData.description,
        location: spaceData.location,
        hourly_rate: spaceData.hourlyRate, // Convert camelCase to snake_case
        capacity: spaceData.capacity,
        category: spaceData.category,
        amenities: spaceData.amenities,
        images: spaceData.images,
        owner_id: null, // Set to null since we don't have proper auth integration yet
        owner_name: 'Admin User',
        rating: 5.0,
        reviews: 0,
        availability: {}
      };

      const { data, error } = await supabase
        .from('spaces')
        .insert([newSpace])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Space created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating space:', error);
      throw new Error(`Failed to create space: ${error.message}`);
    }
  },

  // Update space
  async updateSpace(id, spaceData) {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .update(spaceData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating space:', error);
      throw error;
    }
  },

  // Delete space
  async deleteSpace(id) {
    try {
      const { error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting space:', error);
      throw error;
    }
  }
};