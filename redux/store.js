import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Import reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add reducers here
  },
});

export default store;
