import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};
const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setcategories: (state, { payload = [] }) => {
      state.categories = payload;
    },
  },
});
const { reducer, actions } = CategorySlice;

export const { setcategories } = actions;

export default reducer;
