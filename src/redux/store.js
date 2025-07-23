import { configureStore } from '@reduxjs/toolkit';
import countslice from './CountSlice'
import userslice from './UserSlice'

const store = configureStore({
  reducer: {
    countslice,
    userslice
  }
});

export default store