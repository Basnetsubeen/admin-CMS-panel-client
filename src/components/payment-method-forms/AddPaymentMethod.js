import React from "react";
import { Button, Form } from "react-bootstrap";
import CustomInputField from "../../customInputField/CustomInputField";
import { CustomModel } from "../model/CustomModel";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postPaymentMethodAction } from "../../pages/payment-method/paymentAction";

const initialState = {
  status: "",
  name: "",
  description: "",
};
const AddPaymentMethod = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(postPaymentMethodAction(form));
  };
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Enter category name",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
      placeholder: "Write information about the payment method",
    },
  ];

  return (
    <CustomModel title="Add New Payment Method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="status"
            onChange={handleOnChange}
          />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInputField key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group>
          <Button variant="success" type="submit">
            {" "}
            Add Payment Method
          </Button>
        </Form.Group>
      </Form>
    </CustomModel>
  );
};

export default AddPaymentMethod;
