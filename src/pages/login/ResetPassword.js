import React from "react";
import { Alert, Container } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { RequestOTP } from "../../components/reset-password/RequestOTP";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";
import { useState } from "react";
import {
  requestOtpResetAdminUserPassword,
  resetAdminUserPassword,
} from "../../helpers/axiosHelper";

const ResetPassword = () => {
  const [passwordForm, setPasswordForm] = useState("otp");
  const [resp, setResp] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const handleOnOtpRequest = async (email) => {
    if (!email) {
      return alert("No email received");
    }
    setUserEmail(email);
    const response = await requestOtpResetAdminUserPassword({ email });
    setResp(response);
    response.status === "success" && setPasswordForm("password");
  };
  const handleOnPasswordUpdate = async (data) => {
    data.email = userEmail;
    const response = await resetAdminUserPassword(data);
    setResp(response);
  };

  const form = {
    otp: <RequestOTP handleOnOtpRequest={handleOnOtpRequest} />,
    password: (
      <ResetPasswordForm handleOnPasswordUpdate={handleOnPasswordUpdate} />
    ),
  };
  return (
    <div>
      <Header />
      <Container className=" page-main py-5">
        {resp.message && (
          <Alert variant={resp.status === "success" ? "success" : "danger"}>
            {resp.message}
          </Alert>
        )}
        <div className="password-forms">{form[passwordForm]}</div>
      </Container>
      <Footer />
    </div>
  );
};

export default ResetPassword;
