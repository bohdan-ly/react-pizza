import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { name: 'popularity (hight to low)', sortKey: 'rating' },
  search: '',
  page: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearch, setPage } = filterSlice.actions;

export default filterSlice.reducer;
