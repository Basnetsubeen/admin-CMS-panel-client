import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./pages/login/userSlice";
import systemReducer from "./pages/system-state/SytemSlice";
import categoryReducer from "./pages/categories/CategorySlice";
import paymentMethodReducer from "./pages/payment-method/paymentSlice";

const store = configureStore({
  reducer: {
    admin: useReducer,
    system: systemReducer,
    category: categoryReducer,
    paymentMethod: paymentMethodReducer,
  },
});

export default store;
