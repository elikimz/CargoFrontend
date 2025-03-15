import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://cargoapi-fjhke5hfbvczgac9.southafricanorth-01.azurewebsites.net/";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Auth Token:", token);
      
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
    getAllNotifications: builder.query({
      query: () => "notifications",
    }),
    getUserNotifications: builder.query({
      query: () => "notifications/me",
    }),
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: "notifications",
        method: "POST",
        body: notificationData,
      }),
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetUserNotificationsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
