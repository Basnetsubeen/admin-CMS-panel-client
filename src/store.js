import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./pages/login/userSlice";

const store = configureStore({
  reducer: {
    admin: useReducer,
  },
});

export default store;
