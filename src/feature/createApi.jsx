import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: "http://64.227.180.135:9005/api" }),

  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (signupdata) => ({
        url: "/signup",
        method: "POST",
        body: signupdata,
      }),
    }),
    userSignIn: builder.mutation({
      query: (signindata) => ({
        url: "/login",
        method: "POST",
        body: signindata,
      }),
    }),
  }),
});

export const { useUserSignUpMutation, useUserSignInMutation } = userApi;
