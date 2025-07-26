import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '@/integrations/supabase/client';
import { addSpace, updateSpace, deleteSpace } from '../store/slices/spacesSlice';

export const useRealtimeSpaces = () => {
  let dispatch;
  
  try {
    dispatch = useDispatch();
  } catch (error) {
    console.error('Redux context not available:', error);
    return null;
  }

  useEffect(() => {
    if (!dispatch) {
      console.warn('Dispatch not available, skipping realtime setup');
      return;
    }

    // Create a channel for real-time updates
    const channel = supabase
      .channel('spaces-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'spaces'
        },
        (payload) => {
          console.log('Space inserted:', payload.new);
          // Convert snake_case to camelCase for consistency
          const newSpace = {
            id: payload.new.id,
            title: payload.new.title,
            description: payload.new.description,
            location: payload.new.location,
            hourlyRate: payload.new.hourly_rate,
            capacity: payload.new.capacity,
            category: payload.new.category,
            amenities: payload.new.amenities || [],
            images: payload.new.images || [],
            ownerId: payload.new.owner_id,
            ownerName: payload.new.owner_name,
            rating: payload.new.rating,
            reviews: payload.new.reviews,
            availability: payload.new.availability || {},
            createdAt: payload.new.created_at,
            updatedAt: payload.new.updated_at
          };
          dispatch(addSpace(newSpace));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'spaces'
        },
        (payload) => {
          console.log('Space updated:', payload.new);
          // Convert snake_case to camelCase for consistency
          const updatedSpace = {
            id: payload.new.id,
            title: payload.new.title,
            description: payload.new.description,
            location: payload.new.location,
            hourlyRate: payload.new.hourly_rate,
            capacity: payload.new.capacity,
            category: payload.new.category,
            amenities: payload.new.amenities || [],
            images: payload.new.images || [],
            ownerId: payload.new.owner_id,
            ownerName: payload.new.owner_name,
            rating: payload.new.rating,
            reviews: payload.new.reviews,
            availability: payload.new.availability || {},
            createdAt: payload.new.created_at,
            updatedAt: payload.new.updated_at
          };
          dispatch(updateSpace({ id: payload.new.id, updates: updatedSpace }));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'spaces'
        },
        (payload) => {
          console.log('Space deleted:', payload.old);
          dispatch(deleteSpace(payload.old.id));
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch]);

  return null; // This hook doesn't return anything, it just manages side effects
};