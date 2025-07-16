import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  spaceId: string;
  spaceName: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  invoice: {
    id: string;
    subtotal: number;
    tax: number;
    total: number;
    issuedAt: string;
  };
  createdAt: string;
}

interface BookingsState {
  bookings: Booking[];
  currentBooking: Booking | null;
  loading: boolean;
}

const initialState: BookingsState = {
  bookings: [],
  currentBooking: null,
  loading: false,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<{ id: string; updates: Partial<Booking> }>) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], ...action.payload.updates };
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload);
      if (index !== -1) {
        state.bookings[index].status = 'cancelled';
      }
    },
  },
});

export const {
  setBookings,
  setCurrentBooking,
  setLoading,
  addBooking,
  updateBooking,
  cancelBooking,
} = bookingsSlice.actions;
export default bookingsSlice.reducer;