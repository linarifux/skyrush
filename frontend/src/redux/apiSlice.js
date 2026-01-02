import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  // Use the env variable, or fallback to localhost for development if env is missing
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000', 
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], 
  endpoints: (builder) => ({}), 
});