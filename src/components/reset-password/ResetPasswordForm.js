import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import CustomInputField from "../../customInputField/CustomInputField";
import { useState } from "react";

const ResetPasswordForm = ({ handleOnPasswordUpdate }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    //error boundary
    const { password } = form;
    setError("");

    if (name === "confirmPassword") {
      password !== value &&
        setError("password and confirm password must match");

      password.length < 6 &&
        setError("password must be longer than 6 charcters");
      !/[a-z]/.test(password) &&
        setError("password must be atleast one lowercase");
      !/[A-Z]/.test(password) &&
        setError("password must be atleast one uppercase");
      !/[0-9]/.test(password) &&
        setError("password must be atleast one number");
      !password && setError("Password must be provided");
    }
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    handleOnPasswordUpdate(rest);
  };
  return (
    <div className="form">
      <h2>Update New Password</h2>
      <hr />
      <Form onSubmit={handleOnsubmit}>
        <CustomInputField
          onChange={handleOnChange}
          label="OTP"
          name="otp"
          type="number"
          required={true}
          placeholder="check your email for otp"
        />
        <CustomInputField
          onChange={handleOnChange}
          label="Password"
          name="password"
          type="password"
          required={true}
          placeholder="********"
        />
        <Form.Group>
          <Form.Text className="py-3">
            Note: Password must contain atleast one number, lowercase, uppercase
            and must be longer than 6 character.
          </Form.Text>
        </Form.Group>
        <CustomInputField
          onChange={handleOnChange}
          label="ConfirmPassword"
          name="confirmPassword"
          type="password"
          required={true}
          placeholder="********"
        />
        <Form.Group className="mb-3">
          {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>
        <Form.Group className="d-grid">
          <Button variant="warning" type="submit" disabled={error}>
            Update Password
          </Button>
          <div className="text-end">
            <a href="/reset-password">Request OTP</a>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
