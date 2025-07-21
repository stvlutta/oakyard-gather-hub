import { supabase } from '@/integrations/supabase/client';

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