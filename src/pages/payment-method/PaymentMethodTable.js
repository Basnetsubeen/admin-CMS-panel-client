import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deletePaymentMethodAction,
  getPaymentMethodAction,
} from "./paymentAction";
import { Button } from "react-bootstrap";
import EditPaymentMethod from "../../components/payment-method-forms/EditPaymentMethod";
import AddPaymentMethod from "../../components/payment-method-forms/AddPaymentMethod";
import { setSeletctedPaymentMethods } from "./paymentSlice";

const PaymentMethodTable = ({ showForm, handleOnAddPaymentMethod }) => {
  const dispatch = useDispatch();
  const { paymentMethods } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    dispatch(getPaymentMethodAction());
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this payment method")) {
      dispatch(deletePaymentMethodAction(_id));
    }
  };
  const handleOnEdit = (item) => {
    dispatch(setSeletctedPaymentMethods(item));
    handleOnAddPaymentMethod("edit");
  };
  const paymentMethodForm = {
    add: <AddPaymentMethod />,
    edit: <EditPaymentMethod />,
  };
  return (
    <div>
      {paymentMethodForm[showForm]}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentMethodTable;
