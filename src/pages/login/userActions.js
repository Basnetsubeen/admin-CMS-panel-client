import { toast } from "react-toastify";
import { loginAdminUser } from "../../helpers/axiosHelper";
import { setAdminUsers } from "./userSlice";

export const loginUserAction = (data) => async (dispatch) => {
  const resultPromise = loginAdminUser(data);
  toast.promise(resultPromise, { pending: "please wait..." });
  const { status, message, user } = await resultPromise;
  toast[status](message);
  status === "success" && dispatch(setAdminUsers(user));
};
