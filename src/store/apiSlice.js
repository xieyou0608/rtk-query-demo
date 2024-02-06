import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUserDetail: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getProductDetail: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getCartIds: builder.query({
      query: ({ userId, isAsc = true, startDate, endDate }) => ({
        url: userId ? `/carts/user/${userId}` : "/carts",
        params: {
          sort: isAsc ? "asc" : "desc",
          startdate: startDate,
          enddate: endDate,
        },
      }),
      transformResponse: (response) => {
        return response.map((cart) => cart.id);
      },
    }),
    getCartDetail: builder.query({
      query: (id) => `/carts/${id}`,
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useGetProductDetailQuery,
  useGetCartIdsQuery,
  useGetCartDetailQuery,
} = fakeStoreApi;
