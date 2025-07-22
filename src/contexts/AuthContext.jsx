import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile with role information
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();

            if (error) {
              console.error('Error fetching profile:', error);
            }

            // Combine auth user with profile data
            const fullUser = {
              ...session.user,
              ...profile,
              name: profile?.full_name || session.user.user_metadata?.full_name,
              avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url,
              role: profile?.role || 'user'
            };

            setUser(fullUser);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setUser(session.user);
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setIsAuthenticated(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        // Fetch user profile with role information
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          }

          // Combine auth user with profile data
          const fullUser = {
            ...session.user,
            ...profile,
            name: profile?.full_name || session.user.user_metadata?.full_name,
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url,
            role: profile?.role || 'user'
          };

          setUser(fullUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(session.user);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      toast.success('Login successful!');
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userData.name,
          }
        }
      });

      if (error) throw error;

      toast.success('Registration successful!');
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Google login failed');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success('Password reset email sent! Check your inbox.');
      return { success: true };
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.message || 'Failed to send reset email');
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (password) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast.success('Password reset successful!');
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password');
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (passwords) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword
      });

      if (error) throw error;

      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error.message || 'Failed to change password');
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) throw error;

      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      toast.error(error.message || 'Failed to update profile');
      return { success: false, error: error.message };
    }
  };

  const refreshUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      setUser(user);
      return user;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      return null;
    }
  };

  const value = {
    user,
    session,
    loading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};