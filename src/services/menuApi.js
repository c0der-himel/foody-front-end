import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://powerful-retreat-84363.herokuapp.com/',
  }),
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => 'menu',
    }),
  }),
});

export const { useGetAllMenuItemsQuery } = menuApi;
