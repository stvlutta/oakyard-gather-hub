import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          
          const { access_token } = response.data.data;
          localStorage.setItem('access_token', access_token);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API with mock implementation for demo
export const authAPI = {
  register: (userData) => {
    // Mock registration
    return Promise.resolve({
      data: {
        data: {
          message: 'Registration successful'
        }
      }
    });
  },
  login: (credentials) => {
    // Mock login - simulate successful login with demo credentials
    if (credentials.email === 'admin@oakyard.com' && credentials.password === 'admin123') {
      return Promise.resolve({
        data: {
          data: {
            access_token: 'mock_access_token',
            refresh_token: 'mock_refresh_token',
            user: {
              id: 1,
              name: 'Admin User',
              email: 'admin@oakyard.com',
              role: 'admin',
              avatar: null
            }
          }
        }
      });
    } else {
      return Promise.reject({
        response: {
          data: {
            message: 'Invalid credentials'
          }
        }
      });
    }
  },
  logout: () => Promise.resolve({ data: { message: 'Logged out' } }),
  getMe: () => {
    const token = localStorage.getItem('access_token');
    if (token === 'mock_access_token') {
      return Promise.resolve({
        data: {
          data: {
            user: {
              id: 1,
              name: 'Admin User',
              email: 'admin@oakyard.com',
              role: 'admin',
              avatar: null
            }
          }
        }
      });
    } else {
      return Promise.reject({ response: { status: 401 } });
    }
  },
  forgotPassword: (email) => Promise.resolve({ data: { message: 'Reset email sent' } }),
  resetPassword: (token, password) => Promise.resolve({ data: { message: 'Password reset' } }),
  changePassword: (passwords) => Promise.resolve({ data: { message: 'Password changed' } }),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteAvatar: () => api.delete('/users/avatar'),
  getBookings: (params) => api.get('/users/bookings', { params }),
  getDashboard: () => api.get('/users/dashboard'),
  getSettings: () => api.get('/users/settings'),
  updateSettings: (settings) => api.put('/users/settings', settings),
};

// Spaces API
export const spacesAPI = {
  getSpaces: (params) => api.get('/spaces', { params }),
  getSpace: (id) => api.get(`/spaces/${id}`),
  createSpace: (spaceData) => api.post('/spaces', spaceData),
  updateSpace: (id, spaceData) => api.put(`/spaces/${id}`, spaceData),
  deleteSpace: (id) => api.delete(`/spaces/${id}`),
  uploadImages: (id, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return api.post(`/spaces/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (spaceId, imageName) => api.delete(`/spaces/${spaceId}/images/${imageName}`),
  getAvailability: (id, params) => api.get(`/spaces/${id}/availability`, { params }),
  getReviews: (id, params) => api.get(`/spaces/${id}/reviews`, { params }),
  addReview: (id, review) => api.post(`/spaces/${id}/reviews`, review),
  getCategories: () => api.get('/spaces/categories'),
  getFeatured: (params) => api.get('/spaces/featured', { params }),
};

// Bookings API
export const bookingsAPI = {
  getBookings: (params) => api.get('/bookings', { params }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  updateBooking: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  cancelBooking: (id, reason) => api.post(`/bookings/${id}/cancel`, { reason }),
  processPayment: (id, paymentData) => api.post(`/bookings/${id}/payment`, paymentData),
  getCalendar: (params) => api.get('/bookings/calendar', { params }),
  getStats: () => api.get('/bookings/stats'),
  checkAvailability: (availabilityData) => api.post('/bookings/check-availability', availabilityData),
};

// Meetings API
export const meetingsAPI = {
  getRooms: (params) => api.get('/rooms', { params }),
  getRoom: (id) => api.get(`/rooms/${id}`),
  createRoom: (roomData) => api.post('/rooms', roomData),
  updateRoom: (id, roomData) => api.put(`/rooms/${id}`, roomData),
  deleteRoom: (id) => api.delete(`/rooms/${id}`),
  joinRoom: (id, password) => api.post(`/rooms/${id}/join`, { password }),
  leaveRoom: (id) => api.post(`/rooms/${id}/leave`),
  joinByCode: (roomCode, password) => api.post('/rooms/join-by-code', { room_code: roomCode, password }),
  getParticipants: (id) => api.get(`/rooms/${id}/participants`),
  getMessages: (id, params) => api.get(`/rooms/${id}/messages`, { params }),
  sendMessage: (id, message) => api.post(`/rooms/${id}/messages`, message),
  extendRoom: (id, hours) => api.post(`/rooms/${id}/extend`, { hours }),
  getActiveRooms: () => api.get('/rooms/active'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deactivateUser: (id) => api.post(`/admin/users/${id}/deactivate`),
  activateUser: (id) => api.post(`/admin/users/${id}/activate`),
  getSpaces: (params) => api.get('/admin/spaces', { params }),
  approveSpace: (id) => api.post(`/admin/spaces/${id}/approve`),
  rejectSpace: (id) => api.post(`/admin/spaces/${id}/reject`),
  featureSpace: (id) => api.post(`/admin/spaces/${id}/feature`),
  unfeatureSpace: (id) => api.post(`/admin/spaces/${id}/unfeature`),
  getBookings: (params) => api.get('/admin/bookings', { params }),
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
  getReviews: (params) => api.get('/admin/reviews', { params }),
  getRooms: (params) => api.get('/admin/rooms', { params }),
  deactivateRoom: (id) => api.post(`/admin/rooms/${id}/deactivate`),
};

// Utility functions
export const handleAPIError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || 'An unexpected error occurred';
};

export const formatAPIResponse = (response) => {
  return response.data?.data || response.data;
};

// Export default api instance
export default api;