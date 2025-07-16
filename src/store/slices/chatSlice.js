import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatRooms: {},
  activeRoom: null,
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRoom: (state, action) => {
      state.chatRooms[action.payload.spaceId] = action.payload;
    },
    setActiveRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
    addMessage: (state, action) => {
      const { spaceId } = action.payload;
      if (state.chatRooms[spaceId]) {
        state.chatRooms[spaceId].messages.push(action.payload);
      }
    },
    updateParticipants: (state, action) => {
      const { spaceId, participants } = action.payload;
      if (state.chatRooms[spaceId]) {
        state.chatRooms[spaceId].participants = participants;
      }
    },
    setLoading: (state, action) => {
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