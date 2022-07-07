import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart,
  },
});
