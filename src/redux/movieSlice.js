// src/slices/dataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for fetching data
export const fetchData = createAsyncThunk('data/fetchData', async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: 'movieData',
  initialState: {
    movieData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
