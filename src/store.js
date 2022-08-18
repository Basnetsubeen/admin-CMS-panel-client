import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./pages/login/userSlice";
import systemReducer from "./pages/system-state/SytemSlice";
import categoryReducer from "./pages/categories/CategorySlice";

const store = configureStore({
  reducer: {
    admin: useReducer,
    system: systemReducer,
    category: categoryReducer,
  },
});

export default store;
