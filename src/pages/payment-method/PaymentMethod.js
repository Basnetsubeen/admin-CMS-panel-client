import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AdminLayout from "../../components/layout/AdminLayout";
import AddPaymentMethod from "../../components/payment-method-forms/AddPaymentMethod";
import { setModalShow } from "../system-state/SytemSlice";
import PaymentMethodTable from "./PaymentMethodTable";

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const handleOnAddPaymentMethod = () => {
    dispatch(setModalShow());
  };
  return (
    <AdminLayout>
      <h4 className="py-4">Payment Method Management</h4>
      <hr />
      <AddPaymentMethod />
      <div className="text-end py-3">
        <Button variant="primary" onClick={handleOnAddPaymentMethod}>
          <i className="fa-solid fa-plus"></i> Add New Payment Method
        </Button>
      </div>
      <PaymentMethodTable />
    </AdminLayout>
  );
};

export default PaymentMethod;
