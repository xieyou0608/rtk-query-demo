import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiQueryCategories,
  apiQueryProductDetail,
  apiQueryProductIds,
} from "apis/productApi";

const DEFAULT_PAGE_SIZE = 3;

export const fetchProductIds = createAsyncThunk(
  "products/fetchProductIds",
  async (filters) => {
    const ids = await apiQueryProductIds(filters); // [0, 1, 2, ...]
    return ids;
  }
);
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (curPageIds) => {
    const detailList = await Promise.all(
      curPageIds.map((id) => apiQueryProductDetail(id)) // [{id: 0, name: 'backpack'}, {id: 1, name: 'shirts'}, ...]
    );
    return detailList;
  }
);
export const fetchCategoryOptions = createAsyncThunk(
  "products/fetchCategoryOptions",
  async () => {
    const options = await apiQueryCategories();
    return options;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productIds: [],
    isLoadingIds: false,
    productDetails: {},
    isLoadingDetails: false,
    categoryOptions: [],
    isLoadingCategory: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductIds.pending, (state) => {
        state.isLoadingIds = true;
      })
      .addCase(fetchProductIds.fulfilled, (state, action) => {
        state.isLoadingIds = false;
        state.productIds = action.payload;
      })
      .addCase(fetchProductIds.rejected, (state, action) => {
        state.isLoadingIds = false;
        console.log(action.error);
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        const detailList = action.payload;
        detailList.forEach((product) => {
          state.productDetails[product.id] = product;
        });
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        console.log(action.error);
      })
      .addCase(fetchCategoryOptions.pending, (state) => {
        state.isLoadingCategory = true;
      })
      .addCase(fetchCategoryOptions.fulfilled, (state, action) => {
        state.isLoadingCategory = false;
        state.categoryOptions = action.payload;
      })
      .addCase(fetchCategoryOptions.rejected, (state, action) => {
        state.isLoadingCategory = false;
        console.log(action.error);
      });
  },
});

export const { setCurPage, setFilters, setPageSize } = productSlice.actions;

export default productSlice.reducer;
