import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://cargoapi-fjhke5hfbvczgac9.southafricanorth-01.azurewebsites.net/"; // Replace with your actual API URL

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
    credentials: "include", // Ensures cookies and tokens are sent
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
