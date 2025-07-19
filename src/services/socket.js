import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.eventHandlers = new Map();
  }

  connect(token) {
    if (this.socket?.connected) {
      return Promise.resolve();
    }

    const socketURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    // Skip WebSocket connection in development mode for demo
    const currentToken = token || localStorage.getItem('access_token');
    if (currentToken === 'mock_access_token') {
      console.log('📱 Mock mode: Skipping WebSocket connection');
      return Promise.resolve();
    }

    this.socket = io(socketURL, {
      auth: {
        token: currentToken,
      },
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.setupEventHandlers();
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.warn('⚠️ WebSocket connection timeout - continuing anyway');
        resolve();
      }, 10000); // 10 second timeout

      this.socket.on('connect', () => {
        console.log('✅ Connected to WebSocket server');
        this.reconnectAttempts = 0;
        clearTimeout(timeout);
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ WebSocket connection failed:', error);
        clearTimeout(timeout);
        // Don't reject - just resolve to allow app to continue
        resolve();
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('🔌 Disconnected from WebSocket server');
    } else {
      console.log('🔌 No active WebSocket connection to disconnect');
    }
  }

  setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🔄 WebSocket reconnected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔌 WebSocket disconnected:', reason);
    });

    this.socket.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
    });

    // Meeting room events
    this.socket.on('participant_joined', (data) => {
      this.emit('participant_joined', data);
    });

    this.socket.on('participant_left', (data) => {
      this.emit('participant_left', data);
    });

    this.socket.on('participant_status_changed', (data) => {
      this.emit('participant_status_changed', data);
    });

    this.socket.on('new_message', (data) => {
      this.emit('new_message', data);
    });

    this.socket.on('room_joined', (data) => {
      this.emit('room_joined', data);
    });

    this.socket.on('room_left', (data) => {
      this.emit('room_left', data);
    });

    // WebRTC signaling events
    this.socket.on('offer', (data) => {
      this.emit('offer', data);
    });

    this.socket.on('answer', (data) => {
      this.emit('answer', data);
    });

    this.socket.on('ice_candidate', (data) => {
      this.emit('ice_candidate', data);
    });

    // Notification events
    this.socket.on('notification', (data) => {
      this.emit('notification', data);
    });

    this.socket.on('booking_update', (data) => {
      this.emit('booking_update', data);
    });
  }

  // Meeting room methods
  joinRoom(roomId, password = '') {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    
    return new Promise((resolve, reject) => {
      this.socket.emit('join_room', { room_id: roomId, password }, (response) => {
        if (response?.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  }

  leaveRoom(roomId) {
    if (!this.socket) return;
    
    this.socket.emit('leave_room', { room_id: roomId });
  }

  sendMessage(roomId, message, messageType = 'text') {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    
    this.socket.emit('send_message', {
      room_id: roomId,
      message,
      message_type: messageType,
    });
  }

  toggleMute(roomId, isMuted) {
    if (!this.socket) return;
    
    this.socket.emit('toggle_mute', {
      room_id: roomId,
      is_muted: isMuted,
    });
  }

  toggleVideo(roomId, videoEnabled) {
    if (!this.socket) return;
    
    this.socket.emit('toggle_video', {
      room_id: roomId,
      video_enabled: videoEnabled,
    });
  }

  // WebRTC signaling methods
  sendOffer(roomId, targetUserId, offer) {
    if (!this.socket) return;
    
    this.socket.emit('offer', {
      room_id: roomId,
      target_user_id: targetUserId,
      offer,
    });
  }

  sendAnswer(roomId, targetUserId, answer) {
    if (!this.socket) return;
    
    this.socket.emit('answer', {
      room_id: roomId,
      target_user_id: targetUserId,
      answer,
    });
  }

  sendIceCandidate(roomId, targetUserId, candidate) {
    if (!this.socket) return;
    
    this.socket.emit('ice_candidate', {
      room_id: roomId,
      target_user_id: targetUserId,
      candidate,
    });
  }

  getRoomParticipants(roomId) {
    if (!this.socket) return;
    
    this.socket.emit('get_room_participants', { room_id: roomId });
  }

  // Event handling
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event).add(handler);
  }

  off(event, handler) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).delete(handler);
    }
  }

  emit(event, data) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }

  // Connection status
  isConnected() {
    return this.socket?.connected || false;
  }

  // Reconnect manually
  reconnect() {
    if (this.socket) {
      this.socket.connect();
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;