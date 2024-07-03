import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant/apiConstant';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
