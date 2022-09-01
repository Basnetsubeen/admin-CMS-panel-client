import { toast } from "react-toastify";
import { fetchProducts, postProducts } from "../../helpers/axiosHelper";
import { setProducts } from "./productSlice";

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await fetchProducts();
  status === "success" && dispatch(setProducts(products));
};
export const postProductsAction = (data) => async (dispatch) => {
  const responsePending = postProducts(data);
  toast.promise(responsePending, { pending: "please wait ......" });
  const { status, message } = await responsePending;
  toast[status](message);

  //   status === "success" && dispatch(setProducts(products));
};
