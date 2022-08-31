import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./pages/login/userSlice";
import systemReducer from "./pages/system-state/SytemSlice";
import categoryReducer from "./pages/categories/CategorySlice";
import paymentMethodReducer from "./pages/payment-method/paymentSlice";
import productReducer from "./pages/products/productSlice";

const store = configureStore({
  reducer: {
    admin: useReducer,
    system: systemReducer,
    category: categoryReducer,
    paymentMethod: paymentMethodReducer,
    product: productReducer,
  },
});

export default store;
