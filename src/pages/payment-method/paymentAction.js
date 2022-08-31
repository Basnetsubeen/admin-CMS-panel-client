import { toast } from "react-toastify";
import {
  deletePaymentMethod,
  fetchPaymentMethod,
  postPaymentMethod,
} from "../../helpers/axiosHelper";
import { setModalShow } from "../system-state/SytemSlice";
import { setPaymentMethods } from "./paymentSlice";

//get all the payment methods
export const getPaymentMethodAction = () => async (dispatch) => {
  const { status, paymentMethod } = await fetchPaymentMethod();
  status === "success" && dispatch(setPaymentMethods(paymentMethod));
};
//insert all the payment method
export const postPaymentMethodAction = (data) => async (dispatch) => {
  const promisePending = postPaymentMethod(data);
  toast.promise(promisePending, { pending: "please wait ....." });

  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" &&
    dispatch(setModalShow()) &&
    dispatch(getPaymentMethodAction());
};
//delete payment method
export const deletePaymentMethodAction = (_id) => async (dispatch) => {
  const promisePending = deletePaymentMethod(_id);
  toast.promise(promisePending, { pending: "please wait ....." });

  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getPaymentMethodAction());
};
