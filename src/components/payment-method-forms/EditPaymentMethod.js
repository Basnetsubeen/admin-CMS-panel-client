import React from "react";
import { Button, Form } from "react-bootstrap";
import CustomInputField from "../../customInputField/CustomInputField";
import { CustomModel } from "../model/CustomModel";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentMethodAction } from "../../pages/payment-method/paymentAction";

const initialState = {
  status: "",
  name: "",
  description: "",
};
const EditPaymentMethod = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const { selectedPaymentMethod } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    setForm(selectedPaymentMethod);
  }, [selectedPaymentMethod]);

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
    const { createdAt, updatedAt, __v, ...rest } = form;
    console.log(rest);
    dispatch(updatePaymentMethodAction(rest));
  };
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Enter category name",
      value: form.name,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
      placeholder: "Write information about the payment method",
      value: form.description,
    },
  ];

  return (
    <CustomModel title="Edit Payment Method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInputField key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group>
          <Button variant="success" type="submit">
            {" "}
            Edit
          </Button>
        </Form.Group>
      </Form>
    </CustomModel>
  );
};

export default EditPaymentMethod;
