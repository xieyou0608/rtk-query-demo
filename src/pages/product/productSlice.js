import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_PAGE_SIZE = 3;

export const productSlice = createSlice({
  name: "products",
  initialState: {
    filters: {
      isAsc: true,
      categoryId: "",
    },
    pageSize: DEFAULT_PAGE_SIZE,
    curPage: 0,
  },
  reducers: {
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setFilters(state, action) {
      state.curPage = 0;
      state.filters = action.payload;
    },
    setPageSize(state, action) {
      state.curPage = 0;
      state.pageSize = action.payload;
    },
  },
});

export const { setCurPage, setFilters, setPageSize } = productSlice.actions;

export default productSlice.reducer;
