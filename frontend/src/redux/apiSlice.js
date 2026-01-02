import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'http://localhost:5000', // Your Backend URL
  prepareHeaders: (headers) => {
    // If we have a token (though we are using cookies, this is good practice)
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], // Caching tags
  endpoints: (builder) => ({}), // We inject endpoints later
});