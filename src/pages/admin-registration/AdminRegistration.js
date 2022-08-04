import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInputField from "../../customInputField/CustomInputField";
import { useState } from "react";

const AdminRegistration = () => {
  const [form, setForm] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const fields = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Messi",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Messi",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Messi@10",
      required: true,
    },
    {
      label: "Phone",
      name: "Phone",
      type: "number",
      placeholder: "10000010",
      required: true,
    },
    {
      label: "DOB",
      name: "DOB",
      type: "date",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "sydney",
    },
    {
      label: "Password",
      name: "Password",
      type: "password",
      placeholder: "*****",
      required: true,
    },
    {
      label: "Confirm Password",
      name: " Confirm Password",
      type: "password",
      placeholder: "*****",
      required: true,
    },
  ];
  return (
    <div>
      <Header />

      <Container className="page-main">
        <div className="form">
          <Form onSubmit={handleOnSubmit}>
            <h1>New Admin Registration</h1>
            <hr />
            {fields.map((item, i) => (
              <CustomInputField key={i} {...item} onChange={handleOnChange} />
            ))}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default AdminRegistration;
