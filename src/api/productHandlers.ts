import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse } from '../types/product';




export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, number>({
      query: () => `products`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),

  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
