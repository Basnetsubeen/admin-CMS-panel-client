import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
  selectedPaymentMethod: {},
};
const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },
    setSeletctedPaymentMethods: (state, { payload }) => {
      state.selectedPaymentMethod = payload;
    },
  },
});
const { reducer, actions } = paymentMethodSlice;

export const { setPaymentMethods, setSeletctedPaymentMethods } = actions;

export default reducer;
