import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./pages/login/userSlice";
import systemReducer from "./pages/system-state/SytemSlice";

const store = configureStore({
  reducer: {
    admin: useReducer,
    system: systemReducer,
  },
});

export default store;
