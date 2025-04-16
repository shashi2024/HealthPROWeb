import { apiSlice } from "./apiSlice";

const PAYMENTS_URL = "/api/payments";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for processing payments
    processPayment: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTS_URL}/pay`,
        method: "POST",
        body: data,
      }),
    }),

    // Query for getting payment details
    getPaymentDetails: builder.mutation({
      query: (paymentId) => ({
        url: `${PAYMENTS_URL}/getpay/${paymentId}`,
        method: "GET",
      }),
    }),

    getPaymentsByPatient: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTS_URL}/getpayment/${data}`,
        method: "GET",
      }),
    }),
  }),
});

// Exporting hooks for component usage
export const {
  useProcessPaymentMutation,
  useGetPaymentDetailsMutation,
  useGetPaymentsByPatientMutation,
} = paymentApiSlice;
