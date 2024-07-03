import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
