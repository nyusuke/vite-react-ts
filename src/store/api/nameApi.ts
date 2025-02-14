import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NameType } from 'src/types/name';

export const nameApi = createApi({
  reducerPath: 'nameApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // APIのベースURLに応じて調整してください
  endpoints: (builder) => ({
    getNames: builder.query<NameType[], void>({
      query: () => 'names', // エンドポイントのパスに応じて調整してください
    }),
  }),
});

export const { useGetNamesQuery } = nameApi; 