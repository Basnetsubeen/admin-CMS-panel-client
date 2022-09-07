import { toast } from "react-toastify";
import {
  deleteProducts,
  fetchProducts,
  postProducts,
  updateProducts,
} from "../../helpers/axiosHelper";
import { setProducts, setselectedProduct } from "./productSlice";

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await fetchProducts();
  status === "success" && dispatch(setProducts(products));
};
export const getSingleProductsAction = (_id) => async (dispatch) => {
  const { status, products } = await fetchProducts(_id);
  status === "success" && dispatch(setselectedProduct(products));
};

export const postProductsAction = async (data) => {
  const responsePending = postProducts(data);
  toast.promise(responsePending, { pending: "please wait ......" });
  const { status, message } = await responsePending;
  toast[status](message);
};
export const updateProductsAction = (data) => async (dispatch) => {
  const responsePending = updateProducts(data);
  toast.promise(responsePending, { pending: "please wait ......" });
  const { status, message } = await responsePending;
  toast[status](message);
  status === "success" && dispatch(getSingleProductsAction(data._id));
};
//delete products
export const deleteProductsAction = async (_id, data) => {
  const responsePending = deleteProducts(_id, data);
  toast.promise(responsePending, { pending: "please wait ......" });
  const { status, message } = await responsePending;
  toast[status](message);
};
