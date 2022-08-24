import { toast } from "react-toastify";
import {
  deleteCategory,
  fetchCategory,
  postCategory,
  UpdateCategory,
} from "../../helpers/axiosHelper";
import { setcategories } from "./CategorySlice";

export const getCategoriesAction = () => async (dispatch) => {
  const { status, categories } = await fetchCategory();
  status === "success" && dispatch(setcategories(categories));
};

export const postCategoriesAction = (data) => async (dispatch) => {
  const promisePending = postCategory(data);
  toast.promise(promisePending, { pending: "Please wait ..... " });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getCategoriesAction());
};
export const UpdateCategoriesAction = (data) => async (dispatch) => {
  const promisePending = UpdateCategory(data);
  toast.promise(promisePending, { pending: "Please wait ..... " });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getCategoriesAction());
};

export const deleteCategoriesAction = (_id) => async (dispatch) => {
  const promisePending = deleteCategory(_id);
  toast.promise(promisePending, { pending: "Please wait ..... " });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getCategoriesAction());
};
