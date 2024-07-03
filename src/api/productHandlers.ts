import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant/apiConstant';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useUpdateProductMutation } = productApi;
