import { toast } from "react-toastify";
import { loginAdminUser } from "../../helpers/axiosHelper";
import { setAdminUsers } from "./userSlice";

export const loginUserAction = (data) => async (dispatch) => {
  const resultPromise = loginAdminUser(data);
  toast.promise(resultPromise, { pending: "please wait..." });
  const { status, message, user, accessJWT, refreshJWT } = await resultPromise; //all came form backend with destructuring. So, it has to be exact same
  toast[status](message);
  if (status === "success") {
    sessionStorage.setItem("accessJWT", accessJWT);
    localStorage.setItem("refreshJWT", refreshJWT);
    dispatch(setAdminUsers(user));
  }
};

export const adminLogout = () => (dispatch) => {
  dispatch(setAdminUsers({}));
};
