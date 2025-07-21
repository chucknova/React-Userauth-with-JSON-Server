import { configureStore } from '@reduxjs/toolkit';
import countslice from './CountSlice'

const store = configureStore({
  reducer: {
    countslice
  }
});

export default store