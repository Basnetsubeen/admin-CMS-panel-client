import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import CustomInputField from "../../customInputField/CustomInputField";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { loginUserAction } from "./userActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.admin);

  const origin =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/dashboard";

  useEffect(() => {
    user._id && navigate(origin);
  }, [user, navigate]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUserAction(form));
  };
  return (
    <div>
      <Header />

      <Container className="page-main">
        <div className="form">
          <h3>Welcome Back</h3>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            <CustomInputField
              onChange={handleOnchange}
              label="Email"
              type="email"
              name="email"
              required={true}
              placeholder="Your@email.com"
              // value="neymar11@.com"
            />
            <CustomInputField
              onChange={handleOnchange}
              label="password"
              type="password"
              name="password"
              required={true}
              placeholder="*******"
            />
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginPage;
