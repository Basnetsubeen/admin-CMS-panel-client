import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectedProduct: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.productList = payload;
    },
    setselectedProduct: (state, { payload }) => {
      state.selectedProduct = payload;
    },
  },
});
const { reducer, actions } = productSlice;

export const { setProducts, setselectedProduct } = actions;

export default reducer;
