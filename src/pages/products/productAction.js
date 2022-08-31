import { fetchProducts } from "../../helpers/axiosHelper";
import { setProducts } from "./productSlice";

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await fetchProducts();
  status === "success" && dispatch(setProducts(products));
};
