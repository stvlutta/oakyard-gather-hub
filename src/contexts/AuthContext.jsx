import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, handleAPIError } from '../services/api';
import socketService from '../services/socket';
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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await authAPI.getMe();
          const userData = response.data.data.user;
          setUser(userData);
          setIsAuthenticated(true);
          
          // Connect to WebSocket
          try {
            await socketService.connect(token);
          } catch (socketError) {
            console.warn('Failed to connect to WebSocket:', socketError);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Clear tokens without calling logout to prevent infinite loop
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
          setIsAuthenticated(false);
          socketService.disconnect();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { access_token, refresh_token, user: userData } = response.data.data;
      
      // Store tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
      // Set user state
      setUser(userData);
      setIsAuthenticated(true);
      
      // Connect to WebSocket
      try {
        await socketService.connect(access_token);
      } catch (socketError) {
        console.warn('Failed to connect to WebSocket:', socketError);
      }
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = handleAPIError(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      toast.success('Registration successful! Please check your email to verify your account.');
      return { success: true, data: response.data };
    } catch (error) {
      const message = handleAPIError(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Clear user state
    setUser(null);
    setIsAuthenticated(false);
    
    // Disconnect WebSocket
    socketService.disconnect();
    
    toast.success('Logged out successfully');
  };

  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
      return { success: true };
    } catch (error) {
      const message = handleAPIError(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await authAPI.resetPassword(token, password);
      toast.success('Password reset successful! You can now log in with your new password.');
      return { success: true };
    } catch (error) {
      const message = handleAPIError(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const changePassword = async (passwords) => {
    try {
      await authAPI.changePassword(passwords);
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const message = handleAPIError(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return { success: true, data: updatedUser };
    } catch (error) {
      const message = handleAPIError(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe();
      const userData = response.data.data.user;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // Clear tokens without calling logout to prevent infinite loop
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
      socketService.disconnect();
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};