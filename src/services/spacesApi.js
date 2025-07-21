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
      const { data, error } = await supabase.functions.invoke('spaces', {
        method: 'GET'
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching spaces:', error);
      throw error;
    }
  },

  // Get single space
  async getSpace(id) {
    try {
      const { data, error } = await supabase.functions.invoke('spaces', {
        method: 'GET',
        body: null,
        headers: {},
        query: { id }
      });
      
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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required');
      }

      const { data, error } = await supabase.functions.invoke('spaces', {
        method: 'POST',
        body: spaceData,
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating space:', error);
      throw error;
    }
  },

  // Update space
  async updateSpace(id, spaceData) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required');
      }

      const { data, error } = await supabase.functions.invoke('spaces', {
        method: 'PUT',
        body: spaceData,
        headers: {
          Authorization: `Bearer ${session.access_token}`
        },
        query: { id }
      });
      
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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required');
      }

      const { data, error } = await supabase.functions.invoke('spaces', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`
        },
        query: { id }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error deleting space:', error);
      throw error;
    }
  }
};