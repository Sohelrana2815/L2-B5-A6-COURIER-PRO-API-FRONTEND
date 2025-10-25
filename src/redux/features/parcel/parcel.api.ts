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

    // GET PARCEL BY ID FOR ADMIN
    getAdminParcelById: builder.query({
      query: (parcelId: string) => ({
        url: `/parcel/admin/${parcelId}`,
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
      // accepts optional object { page, limit }
      query: (
        args: { search?: string; page?: number; limit?: number } = {
          page: 1,
          limit: 10,
        }
      ) => ({
        url: `/parcel/admin/all-parcels?${args.search ? `search=${encodeURIComponent(args.search)}&` : ''}page=${args.page}&limit=${args.limit}`,
        method: "GET",
      }),
      providesTags: ["parcel"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response, // return full payload (data + meta)
    }),

    // ADMIN DASHBOARD OVERVIEW

    getParcelsOverview: builder.query({
      query: () => ({
        url: "/parcel/admin/dashboard-overview",
        method: "GET",
      }),
      providesTags: ["parcel"],
    }),
    // ADMIN ULTIMATE CURRENT STATUS COUNTS (ANALYTICS)

    getCurrentStatusCounts: builder.query({
      query: () => ({
        url: "/parcel/admin/final-status-counts",
        method: "GET",
      }),
      providesTags: ["parcel"],
    }),

    // PARCEL TRENDS

    getParcelTrends: builder.query({
      query: () => ({
        url: "/parcel/admin/parcel-trends",
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

    // ADMIN STATUS CHANGE FOR PARCEL

    // block parcel
    blockParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/admin/block/${parcelId}`,
        method: "PATCH",
        data: {},
      }),
      invalidatesTags: ["parcel"],
    }),
    // unblock parcel
    unblockParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/admin/unblock/${parcelId}`,
        method: "PATCH",
        data: {},
      }),
      invalidatesTags: ["parcel"],
    }),

    // picked up parcel
    pickupParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/admin/pickup/${parcelId}`,
        method: "PATCH",
        data: {},
      }),
      invalidatesTags: ["parcel"],
    }),
    // in transit parcel
    inTransitParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/admin/start-transit/${parcelId}`,
        method: "PATCH",
        data: {},
      }),
      invalidatesTags: ["parcel"],
    }),
    // deliver parcel
    deliverParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcel/admin/deliver/${parcelId}`,
        method: "PATCH",
        data: {},
      }),
      invalidatesTags: ["parcel"],
    }),

    // PUBLIC TRACK PARCEL BY TRACKING ID
    trackParcel: builder.query({
      query: (trackingId: string) => ({
        url: `/parcel/public/track-parcel/${trackingId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useMyCreatedParcelsQuery,
  useGetParcelByIdQuery,
  useGetAdminParcelByIdQuery,
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
  useBlockParcelMutation,
  useUnblockParcelMutation,
  usePickupParcelMutation,
  useInTransitParcelMutation,
  useDeliverParcelMutation,
  useTrackParcelQuery,
  useGetParcelsOverviewQuery,
  useGetCurrentStatusCountsQuery,
  useGetParcelTrendsQuery,
} = parcelApi;
