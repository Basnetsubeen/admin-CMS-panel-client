import axios from "axios";

const rootUrl = process.env.REACT_APP_API_ENDPOINT;
const adminUserEP = rootUrl + "/admin-user";
const categoryEP = rootUrl + "/category";
const paymentMethodEP = rootUrl + "/payment-method";
const productEP = rootUrl + "/product";

const apiProcessor = async ({ method, url, data, isPrivate, token }) => {
  try {
    const headers = isPrivate
      ? { Authorization: token || sessionStorage.getItem("accessJWT") }
      : null;
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    let message = error.message;
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }
    if (error.response && error.response.data) {
      message = error.response.data.message;
    }
    if (message === "jwt expired") {
      //call the api to get new accessJWT and store in the session and recall the api processor
      const accessJWT = await getNewAccessJWT();
      if (accessJWT) {
        return apiProcessor({ method, url, data, isPrivate, token });
      }
    }

    return {
      status: "error",
      message,
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
//get admin user  account
export const getAdminUser = (token) => {
  const option = {
    method: "get",
    url: adminUserEP,
    isPrivate: true,
    token,
  };
  return apiProcessor(option);
};
//update user profile
export const updateAdminUser = (data) => {
  const option = {
    method: "put",
    url: adminUserEP,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
//update user password
export const updateAdminUserPassword = (data) => {
  const option = {
    method: "patch",
    url: adminUserEP,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
//request otp for update user password
export const requestOtpResetAdminUserPassword = (data) => {
  const option = {
    method: "post",
    url: adminUserEP + "/request-password-reset-otp",
    data,
  };
  return apiProcessor(option);
};
//reset user password
export const resetAdminUserPassword = (data) => {
  const option = {
    method: "patch",
    url: adminUserEP + "/reset-password",
    data,
  };
  return apiProcessor(option);
};
//fetch new accessJWT
export const getNewAccessJWT = async () => {
  const token = localStorage.getItem("refreshJWT");
  const option = {
    method: "get",
    url: adminUserEP + "/accessjwt",
    isPrivate: true,
    token,
  };
  const { status, accessJWT } = await apiProcessor(option);
  status === "success" && sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
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

//===========Payment Method ==========//
//fetch payment Method
export const fetchPaymentMethod = () => {
  const option = {
    method: "get",
    url: paymentMethodEP,
    isPrivate: true,
  };
  return apiProcessor(option);
};
//post payment method
export const postPaymentMethod = (data) => {
  const option = {
    method: "post",
    url: paymentMethodEP,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
//update payment method
export const updatePaymentMethod = (data) => {
  const option = {
    method: "put",
    url: paymentMethodEP,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
//delete payment method
export const deletePaymentMethod = (_id) => {
  const option = {
    method: "delete",
    url: paymentMethodEP + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};

//==========Poduct apis ===========//
//fetch payment Method
export const fetchProducts = (_id) => {
  const url = _id ? productEP + "/" + _id : productEP;
  const option = {
    method: "get",
    url,
    isPrivate: true,
  };
  return apiProcessor(option);
};
//post product action
export const postProducts = (data) => {
  const option = {
    method: "post",
    url: productEP,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
export const updateProducts = (data) => {
  const option = {
    method: "put",
    url: productEP,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
//delete product action
export const deleteProducts = (_id, data) => {
  const option = {
    method: "delete",
    url: productEP + "/" + _id,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
