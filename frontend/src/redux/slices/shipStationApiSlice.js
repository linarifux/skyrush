import { apiSlice } from '../apiSlice';

const SHIPSTATION_URL = '/api/shipstation';

export const shipStationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Customer (Lookup by email or phone)
    getCustomer: builder.mutation({
      query: (queryString) => ({
        url: `${SHIPSTATION_URL}/customer?${queryString}`,
        method: 'GET',
      }),
    }),

    // 2. Get Rates (Calculate shipping costs)
    getRates: builder.mutation({
      query: (data) => ({
        url: `${SHIPSTATION_URL}/rates`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetCustomerMutation, useGetRatesMutation } = shipStationApiSlice;