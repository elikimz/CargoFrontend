import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cargoapi-bqs3.onrender.com/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "password",   // Required for FastAPI OAuth2
          username: credentials.username,
          password: credentials.password,
          scope: "",                
          client_id: "string",    
          client_secret: "string",
        }).toString(),
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
