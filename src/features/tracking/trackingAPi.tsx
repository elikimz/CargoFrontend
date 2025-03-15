import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://cargoapi-fjhke5hfbvczgac9.southafricanorth-01.azurewebsites.net/";

export const trackingApi = createApi({
  reducerPath: "trackingApi",
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
    getAllTrackings: builder.query({
      query: () => "tracking/all",
    }),
    getTrackingByCargo: builder.query({
      query: (cargoId) => `tracking/${cargoId}`,
    }),
    createTracking: builder.mutation({
      query: (trackingData) => ({
        url: "tracking",
        method: "POST",
        body: trackingData,
      }),
    }),
    updateTracking: builder.mutation({
      query: ({ trackingId, trackingData }) => ({
        url: `tracking/${trackingId}`,
        method: "PUT",
        body: trackingData,
      }),
    }),
    deleteTracking: builder.mutation({
      query: (trackingId) => ({
        url: `tracking/${trackingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTrackingsQuery, // New hook for fetching all trackings
  useGetTrackingByCargoQuery,
  useCreateTrackingMutation,
  useUpdateTrackingMutation,
  useDeleteTrackingMutation,
} = trackingApi;
