import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
  const { page, sortBy, order, category, searchQuery } = params;
  const url = `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${page}&limit=4&sortBy=${sortBy}&order=${order}&${category}${searchQuery}`;
  const { data } = await axios.get(url);
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      // Add user to the state array
      state.items = [{}, {}, {}, {}, {}, {}];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      // Add user to the state array
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      // Add user to the state array
      state.items = [];
      state.status = 'error';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
