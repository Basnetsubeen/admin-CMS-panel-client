import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import CustomInputField from "../../customInputField/CustomInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminPasswordAction,
  updateAdminProfile,
} from "../login/userActions";

const AdminProfile = () => {
  const [form, setForm] = useState({});
  const [password, setpassword] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.admin);
  useEffect(() => {
    user?._id && setForm(user);
  }, [user]);

  const handleOnProfileUpdate = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnProfileSubmit = (e) => {
    e.preventDefault();
    const { address, dob, fName, lName, phone, _id } = form;
    dispatch(updateAdminProfile({ address, dob, fName, lName, phone, _id }));
  };
  const handleOnPasswordUpdate = (e) => {
    const { newPassword, confirmPassword } = password;
    const { name, value } = e.target;
    setError("");
    if (name === "confirmPassword") {
      newPassword !== value && setError("Password do not match");
      newPassword.length < 6 && setError("Password must be 6 character long");
      !/[a-z]/.test(newPassword) && setError("Password must have 1 lower case"); //rejex password check for character a-z
      !/[A-Z]/.test(newPassword) && setError("Password must have 1 upper case"); //rejex password check for character a-z
      !/[0-9]/.test(newPassword) && setError("New password must have 1 number"); //rejex password check for character a-z

      !newPassword && setError("Password field must be provided.");
    }
    setpassword({
      ...password,
      [name]: value,
    });
  };
  const handleOnPasswordSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = password;
    if (!password.password || newPassword !== confirmPassword) {
      return alert(
        "Either current password field is empty or new password and confirm password do not match"
      );
    }
    updateAdminPasswordAction({
      newPassword,
      password: password.password,
      _id: user._id,
    });
    console.log(password);
  };

  const inputFields = [
    {
      name: "fName",
      value: form.fName,
      label: " First Name",
      type: "text",
      placeholder: "sam",
      required: true,
    },
    {
      name: "lName",
      value: form.lName,
      label: "Last Name",
      type: "text",
      placeholder: "smith",
      required: true,
    },
    {
      name: "email",
      value: form.email,
      label: "Email",
      type: "email",
      disabled: true,
      required: true,
    },
    {
      name: "phone",
      value: form.phone,
      label: "Phone",
      type: "text",
      required: true,
    },
    {
      name: "address",
      value: form.address,
      label: "Address",
      type: "text",
    },
    {
      name: "dob",
      value: form.dob ? form.dob.slice(0, 10) : null,
      label: "DOB",
      type: "date",
    },
  ];
  return (
    <AdminLayout>
      <div className="user-profile">
        <h2>Update your profile</h2>
        <hr />
        <Form onSubmit={handleOnProfileSubmit}>
          {inputFields.map((input, index) => (
            <CustomInputField
              key={index}
              {...input}
              onChange={handleOnProfileUpdate}
            />
          ))}
          <Button variant="warning" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
      <hr />
      <div className="mt-5 py-5">
        <h2>Update Password</h2>
        <Form onSubmit={handleOnPasswordSubmit}>
          <CustomInputField
            onChange={handleOnPasswordUpdate}
            name="password"
            type="password"
            required={true}
            label="Current Password"
          />
          <CustomInputField
            onChange={handleOnPasswordUpdate}
            name="newPassword"
            type="password"
            required={true}
            label="New Password"
          />
          <Form.Group className="mb-3">
            <Form.Text>
              Password must contain lowecase, upperCase, number and atleast 6
              character long
            </Form.Text>
          </Form.Group>

          <CustomInputField
            onChange={handleOnPasswordUpdate}
            name="confirmPassword"
            type="password"
            required={true}
            label="Confirm Password"
          />
          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="danger" type="submit" disabled={error}>
            Update password
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
