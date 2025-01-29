// src/slices/dataSlice.js

import { createSlice} from '@reduxjs/toolkit';



const dataSlice = createSlice({
  name: 'movieData',
  initialState: {
    movieData: [],
    status: 'idle', 
    error: null, 
  },
  reducers: {
    setMovieData: (state, action) => {
      state.movieData = action.payload;
      state.status = 'succeeded';
    },
    setMovieDataError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },

});

export const { setMovieData, setMovieDataError } = dataSlice.actions;

export default dataSlice.reducer;
