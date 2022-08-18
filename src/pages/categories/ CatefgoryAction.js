import { toast } from "react-toastify";
import {
  deleteCategory,
  fetchCategory,
  postCategory,
} from "../../helpers/axiosHelper";
import { setcategories } from "./CategorySlice";

export const getCategoriesAction = () => async (dispatch) => {
  const { status, categories } = await fetchCategory();
  console.log(categories);

  status === "success" && dispatch(setcategories(categories));
};

export const postCategoriesAction = (data) => async (dispatch) => {
  const promisePending = postCategory(data);
  toast.promise(promisePending, { pending: "Please wait ..... " });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getCategoriesAction());
};

export const deleteCategoriesAction = (_id) => async (dispatch) => {
  if (!window.confirm("Are you sure you want to delete it?")) {
    return;
  }
  const { status, message } = await deleteCategory(_id);

  toast[status](message);
  status === "success" && dispatch(getCategoriesAction());
};
