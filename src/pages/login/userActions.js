import { toast } from "react-toastify";
import {
  getAdminUser,
  getNewAccessJWT,
  loginAdminUser,
} from "../../helpers/axiosHelper";
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
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
};

//fetch user and mount in the redux store
export const getAdminUserAction = (token) => async (dispatch) => {
  const { status, message, user } = await getAdminUser(token);
  status === "success" && dispatch(setAdminUsers(user));
  console.log(user);
};
export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (accessJWT) {
    //if accessJWT exist, fetch user and mount user in our redux store
    dispatch(getAdminUserAction());
  } else if (refreshJWT) {
    //if refreshJWT exist only, fetch new accessJWT and fetch user using the newly fetch accessJWT
    const token = await getNewAccessJWT();
    token ? dispatch(getAdminUserAction(token)) : dispatch(adminLogout());
  } else {
    dispatch(adminLogout());
  }
};
