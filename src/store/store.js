import { configureStore } from '@reduxjs/toolkit';
import spacesSlice from './slices/spacesSlice';
import bookingsSlice from './slices/bookingsSlice';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    spaces: spacesSlice,
    bookings: bookingsSlice,
    chat: chatSlice,
  },
});