import { configureStore } from "@reduxjs/toolkit";
import productReducer from "pages/product/productSlice";
import cartReducer from "pages/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
  },
});
