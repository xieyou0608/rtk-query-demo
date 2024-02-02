import { configureStore } from "@reduxjs/toolkit";
import productReducer from "pages/product/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
