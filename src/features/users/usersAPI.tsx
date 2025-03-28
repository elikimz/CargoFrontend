import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://cargoapi-bqs3.onrender.com/"; 

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No token found in localStorage!");
      }
      return headers;
    },
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "users/me",
    }),
    updateUserProfile: builder.mutation({
      query: (userUpdate) => ({
        url: "users/update",
        method: "PUT",
        body: userUpdate,
      }),
    }),
    getAllUsers: builder.query({
      query: () => "users/",
    }),
    updateUserById: builder.mutation({
      query: ({ userId, userUpdate }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: userUpdate,
      }),
    }),
    deleteUserById: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
