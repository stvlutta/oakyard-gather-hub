import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spaces: [],
  currentSpace: null,
  loading: false,
  searchQuery: '',
  filters: {
    category: '',
    priceRange: [0, 100000],
    location: '',
  },
};

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    setSpaces: (state, action) => {
      state.spaces = action.payload;
    },
    setCurrentSpace: (state, action) => {
      state.currentSpace = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addSpace: (state, action) => {
      state.spaces.push(action.payload);
    },
    updateSpace: (state, action) => {
      const index = state.spaces.findIndex(space => space.id === action.payload.id);
      if (index !== -1) {
        state.spaces[index] = { ...state.spaces[index], ...action.payload.updates };
      }
    },
    deleteSpace: (state, action) => {
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