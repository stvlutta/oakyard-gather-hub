import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import spacesSlice from './slices/spacesSlice';
import bookingsSlice from './slices/bookingsSlice';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    spaces: spacesSlice,
    bookings: bookingsSlice,
    chat: chatSlice,
  },
});