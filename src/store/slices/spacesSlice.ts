import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Space {
  id: string;
  title: string;
  description: string;
  location: string;
  hourlyRate: number;
  images: string[];
  amenities: string[];
  capacity: number;
  ownerId: string;
  ownerName: string;
  rating: number;
  reviews: number;
  category: 'meeting-room' | 'creative-studio' | 'event-hall' | 'coworking' | 'office';
  availability: {
    [date: string]: {
      available: boolean;
      bookedSlots: string[];
    };
  };
}

interface SpacesState {
  spaces: Space[];
  currentSpace: Space | null;
  loading: boolean;
  searchQuery: string;
  filters: {
    category: string;
    priceRange: [number, number];
    location: string;
  };
}

const initialState: SpacesState = {
  spaces: [],
  currentSpace: null,
  loading: false,
  searchQuery: '',
  filters: {
    category: '',
    priceRange: [0, 1000],
    location: '',
  },
};

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    setSpaces: (state, action: PayloadAction<Space[]>) => {
      state.spaces = action.payload;
    },
    setCurrentSpace: (state, action: PayloadAction<Space | null>) => {
      state.currentSpace = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<SpacesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addSpace: (state, action: PayloadAction<Space>) => {
      state.spaces.push(action.payload);
    },
    updateSpace: (state, action: PayloadAction<{ id: string; updates: Partial<Space> }>) => {
      const index = state.spaces.findIndex(space => space.id === action.payload.id);
      if (index !== -1) {
        state.spaces[index] = { ...state.spaces[index], ...action.payload.updates };
      }
    },
    deleteSpace: (state, action: PayloadAction<string>) => {
      state.spaces = state.spaces.filter(space => space.id !== action.payload);
    },
  },
});

export const {
  setSpaces,
  setCurrentSpace,
  setLoading,
  setSearchQuery,
  setFilters,
  addSpace,
  updateSpace,
  deleteSpace,
} = spacesSlice.actions;
export default spacesSlice.reducer;