// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "https://cargoapi-bqs3.onrender.com/";

// export const cargoApi = createApi({
//   reducerPath: "cargoApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_URL,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       console.log("Auth Token:", token);

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       } else {
//         console.warn("No token found in localStorage!");
//       }
//       return headers;
//     },
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     getAllCargo: builder.query({
//       query: () => "/cargo",
//     }),
//     getCargoById: builder.query({
//       query: (id) => `/cargo/${id}`,
//     }),
//     createCargo: builder.mutation({
//       query: (cargoData) => ({
//         url: "/cargo",
//         method: "POST",
//         body: cargoData,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//     updateCargo: builder.mutation({
//       query: ({ id, cargoData }) => ({
//         url: `/cargo/${id}`,
//         method: "PUT",
//         body: cargoData,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//     deleteCargo: builder.mutation({
//       query: (id) => ({
//         url: `/cargo/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetAllCargoQuery,
//   useGetCargoByIdQuery,
//   useCreateCargoMutation,
//   useUpdateCargoMutation,
//   useDeleteCargoMutation,
// } = cargoApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://cargoapi-bqs3.onrender.com/";

export const cargoApi = createApi({
  reducerPath: "cargoApi",
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
    credentials: "include", // Include credentials for cookies or secure sessions
  }),
  endpoints: (builder) => ({
    getAllCargo: builder.query({
      query: () => "/cargo",
    }),
    getCargoById: builder.query({
      query: (id) => `/cargo/${id}`,
    }),
    createCargo: builder.mutation({
      query: (cargoData) => ({
        url: "/cargo",
        method: "POST",
        body: cargoData,
      }),
    }),
    updateCargo: builder.mutation({
      query: ({ id, cargoData }) => ({
        url: `/cargo/${id}`,
        method: "PUT",
        body: cargoData,
      }),
    }),
    deleteCargo: builder.mutation({
      query: (id) => ({
        url: `/cargo/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCargoQuery,
  useGetCargoByIdQuery,
  useCreateCargoMutation,
  useUpdateCargoMutation,
  useDeleteCargoMutation,
} = cargoApi;
