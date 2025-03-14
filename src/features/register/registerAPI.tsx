import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerAPI = createApi({
  reducerPath: 'registerAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://cargoapi-bqs3.onrender.com/' 
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: 'auth',
        method: 'POST',
        body: newUser,
      }),
    }),
    getUsers: builder.query({
      query: () => '/user', // Fetch all users
    }),
  }),
});

export const { useRegisterUserMutation, useGetUsersQuery } = registerAPI;
