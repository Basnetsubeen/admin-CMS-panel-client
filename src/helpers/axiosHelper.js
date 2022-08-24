import axios from "axios";

const rootUrl = process.env.REACT_APP_API_ENDPOINT;
const adminUserEP = rootUrl + "/admin-user";
const categoryEP = rootUrl + "/category";

const apiProcessor = async ({ method, url, data, isPrivate }) => {
  try {
    const headers = isPrivate
      ? { Authorization: sessionStorage.getItem("accessJWT") }
      : null;
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//post new Admin user

export const postUser = (data) => {
  const option = {
    method: "post",
    url: adminUserEP,
    data,
  };
  return apiProcessor(option);
};
//verify admin user  account
export const emailVerifyAdmin = (data) => {
  const option = {
    method: "patch",
    url: adminUserEP + "/verify-email",
    data,
  };
  return apiProcessor(option);
};
//login admin user  account
export const loginAdminUser = (data) => {
  const option = {
    method: "post",
    url: adminUserEP + "/login",
    data,
  };
  return apiProcessor(option);
};

// ========Categories api calls ====

//post categories
export const postCategory = (data) => {
  const option = {
    method: "post",
    url: categoryEP,
    data,
    isPrivate: true,
  };
  return apiProcessor(option);
};
//Update category
export const UpdateCategory = (data) => {
  const option = {
    method: "put",
    url: categoryEP,
    data,
    isPrivate: true,
  };
  return apiProcessor(option);
};

//fetch categories
export const fetchCategory = (_id) => {
  const option = {
    method: "get",
    url: _id ? categoryEP + "/" + _id : categoryEP,
    isPrivate: true,
  };
  return apiProcessor(option);
};

//delete category
export const deleteCategory = (_id) => {
  const option = {
    method: "delete",
    url: categoryEP + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};
