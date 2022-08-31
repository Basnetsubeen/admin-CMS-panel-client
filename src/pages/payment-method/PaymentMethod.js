import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AdminLayout from "../../components/layout/AdminLayout";
import { setModalShow } from "../system-state/SytemSlice";
import PaymentMethodTable from "./PaymentMethodTable";
import { useState } from "react";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState("");

  const handleOnAddPaymentMethod = (str) => {
    dispatch(setModalShow());
    setShowForm(str);
  };
  return (
    <AdminLayout>
      <h4 className="py-4">Payment Method Management</h4>
      <hr />
      <div className="text-end py-3">
        <Button
          variant="primary"
          onClick={() => handleOnAddPaymentMethod("add")}
        >
          <i className="fa-solid fa-plus"></i> Add New Payment Method
        </Button>
      </div>
      <PaymentMethodTable
        showForm={showForm}
        handleOnAddPaymentMethod={handleOnAddPaymentMethod}
      />
    </AdminLayout>
  );
};

export default PaymentMethod;
