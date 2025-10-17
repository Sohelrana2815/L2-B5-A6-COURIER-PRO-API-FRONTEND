import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        data: userData,
      }),
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        data: userData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
