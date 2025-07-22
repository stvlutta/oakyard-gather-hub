import { supabase } from '@/integrations/supabase/client';

export const meetingsApi = {
  // Create a new meeting room
  async createMeeting(meetingData) {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .insert([{
          title: meetingData.title,
          description: meetingData.description,
          scheduled_at: meetingData.scheduledAt,
          duration_minutes: meetingData.duration,
          host_id: meetingData.hostId || 'admin-user',
          host_name: meetingData.hostName || 'Admin User',
          max_participants: meetingData.maxParticipants || 10,
          is_active: true,
          meeting_code: this.generateMeetingCode()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  },

  // Get all meetings
  async getMeetings() {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('scheduled_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching meetings:', error);
      return [];
    }
  },

  // Get single meeting
  async getMeeting(id) {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching meeting:', error);
      throw error;
    }
  },

  // Join meeting
  async joinMeeting(meetingId, participantData) {
    try {
      const { data, error } = await supabase
        .from('meeting_participants')
        .insert([{
          meeting_id: meetingId,
          participant_name: participantData.name,
          participant_email: participantData.email,
          joined_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error joining meeting:', error);
      throw error;
    }
  },

  // Get meeting by code
  async getMeetingByCode(code) {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('meeting_code', code.toUpperCase())
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching meeting by code:', error);
      throw error;
    }
  },

  // Generate meeting code
  generateMeetingCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
};