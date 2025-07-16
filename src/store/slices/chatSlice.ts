import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: string;
  spaceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export interface ChatRoom {
  spaceId: string;
  spaceName: string;
  messages: ChatMessage[];
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  }[];
}

interface ChatState {
  chatRooms: { [spaceId: string]: ChatRoom };
  activeRoom: string | null;
  loading: boolean;
}

const initialState: ChatState = {
  chatRooms: {},
  activeRoom: null,
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.chatRooms[action.payload.spaceId] = action.payload;
    },
    setActiveRoom: (state, action: PayloadAction<string | null>) => {
      state.activeRoom = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      const { spaceId } = action.payload;
      if (state.chatRooms[spaceId]) {
        state.chatRooms[spaceId].messages.push(action.payload);
      }
    },
    updateParticipants: (state, action: PayloadAction<{ spaceId: string; participants: ChatRoom['participants'] }>) => {
      const { spaceId, participants } = action.payload;
      if (state.chatRooms[spaceId]) {
        state.chatRooms[spaceId].participants = participants;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setChatRoom,
  setActiveRoom,
  addMessage,
  updateParticipants,
  setLoading,
} = chatSlice.actions;
export default chatSlice.reducer;