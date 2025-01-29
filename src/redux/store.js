// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './movieSlice';

const store = configureStore({
  reducer: {
    movieData: dataReducer,
  },
});

export default store;
