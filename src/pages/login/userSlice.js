import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    setAdminUsers: (state, { payload }) => {
      state.user = payload;
    },
  },
});
const { reducer, actions } = userSlice;

export const { setAdminUsers } = actions;

export default reducer;
