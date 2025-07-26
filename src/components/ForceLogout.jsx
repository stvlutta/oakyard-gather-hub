import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { cleanupAuthState } from '@/utils/authCleanup';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ForceLogout = () => {
  const handleForceLogout = async () => {
    try {
      // Clean up all auth state
      cleanupAuthState();
      
      // Force sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast.success('Forced logout successful');
      
      // Force page refresh
      window.location.href = '/';
    } catch (error) {
      console.error('Force logout error:', error);
      // Even if logout fails, clean up and redirect
      cleanupAuthState();
      window.location.href = '/';
    }
  };

  return (
    <Button 
      onClick={handleForceLogout} 
      variant="destructive" 
      size="sm"
      className="fixed top-4 right-4 z-50"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Force Logout
    </Button>
  );
};

export default ForceLogout;