import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "/parcel/create",
        method: "POST",
        data: parcelData,
      }),
      invalidatesTags: ["parcel"],
    }),

    myCreatedParcels: builder.query({
      query: () => ({
        url: "/parcel/sender/my-parcels",
        method: "GET",
      }),
      providesTags: ["parcel"],
      transformResponse: (response) => response.data,
    }),

    getParcelById: builder.query({
      query: (parcelId: string) => ({
        url: `/parcel/sender/${parcelId}`,
        method: "GET",
      }),
      providesTags: ["parcel"],
      transformResponse: (response) => response.data,
    }),

    updateReceiverProfile: builder.mutation({
      query: (profileData) => ({
        url: "/parcel/receiver/update-profile",
        method: "PATCH",
        data: profileData,
      }),
      invalidatesTags: ["user"],
    }),
    // GET All Receivers SENDER ONLY
    getAllReceivers: builder.query({
      query: () => ({
        url: "/parcel/all-receivers",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),

    // CANCEL PARCEL BY ID - SENDER ONLY

    cancelParcel: builder.mutation({
      query: ({ parcelId, note }: { parcelId: string; note: string }) => ({
        url: `/parcel/sender/cancel/${parcelId}`,
        method: "PATCH",
        data: { note },
      }),
      invalidatesTags: ["parcel"],
      transformResponse: (response) => response.data,
    }),

    // RECEIVERS INCOMING PARCELS (PENDING APPROVAL)
    incomingParcels: builder.query({
      query: () => ({
        url: "/parcel/receiver/incoming-parcels",
        method: "GET",
      }),
      providesTags: ["parcel"],
      transformResponse: (response) => response.data,
    }),

    // Approve parcel by receiver

    approveParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/receiver/approve/${parcelId}`,
        method: "PATCH",
        data: {},
      }),
      invalidatesTags: ["parcel"],
    }),

    // DECLINE PARCEL BY RECEIVER ONLY

    declineParcel: builder.mutation({
      query: ({ parcelId, note }: { parcelId: string; note: string }) => ({
        url: `/parcel/receiver/decline/${parcelId}`,
        method: "PATCH",
        data: { note },
      }),
      invalidatesTags: ["parcel"],
      transformResponse: (response) => response.data,
    }),

    // DELIVERY HISTORY FOR RECEIVERS
    deliveryHistory: builder.query({
      query: () => ({
        url: "/parcel/receiver/delivery-history",
        method: "GET",
      }),
      providesTags: ["parcel"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // GET ALL USERS ADMIN ONLY

    getUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response) => response.data,
    }),

    // GET ALL PARCELS ADMIN

    getParcels: builder.query({
      query: () => ({
        url: "/parcel/admin/all-parcels",
        method: "GET",
      }),
      providesTags: ["parcel"],
      transformResponse: (response) => response.data,
    }),

    // ADMIN ONLY BLOCK USER
    blockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    //  // ADMIN ONLY UNBLOCK USER

    unblockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    //  // ADMIN ONLY DELETE USER

    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/soft-delete/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    //  // ADMIN ONLY RESTORE SOFT DELETE USER

    restoreUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/restore/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useMyCreatedParcelsQuery,
  useGetParcelByIdQuery,
  useUpdateReceiverProfileMutation,
  useGetAllReceiversQuery,
  useCancelParcelMutation,
  useIncomingParcelsQuery,
  useApproveParcelMutation,
  useDeliveryHistoryQuery,
  useDeclineParcelMutation,
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useGetParcelsQuery,
} = parcelApi;
