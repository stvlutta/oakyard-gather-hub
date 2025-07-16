import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { loginSuccess, logout, User } from '../store/slices/authSlice';
import { mockUsers } from '../data/mockData';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    // Mock login logic
    const mockUser = mockUsers.find(u => u.email === email);
    if (mockUser && password === 'password') {
      const token = 'mock-jwt-token-' + mockUser.id;
      dispatch(loginSuccess({ user: mockUser, token }));
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const loginWithGoogle = async () => {
    // Mock Google login
    const mockUser: User = {
      id: 'google-' + Date.now(),
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'client',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser',
    };
    const token = 'mock-google-token-' + mockUser.id;
    dispatch(loginSuccess({ user: mockUser, token }));
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true };
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration logic
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      role: 'client',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    const token = 'mock-jwt-token-' + newUser.id;
    dispatch(loginSuccess({ user: newUser, token }));
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true };
  };

  const signOut = () => {
    dispatch(logout());
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  };

  const initializeAuth = () => {
    const token = localStorage.getItem('auth-token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(loginSuccess({ user, token }));
      } catch (error) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
      }
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    loginWithGoogle,
    register,
    signOut,
    initializeAuth,
  };
};