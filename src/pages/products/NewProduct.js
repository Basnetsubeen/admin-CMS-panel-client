import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

const NewProduct = () => {
  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/product">
          <Button>
            <i class="fa-solid fa-arrow-left"></i>
          </Button>
        </Link>
      </div>
      <h1>Add New Products</h1>
      <hr />
      <div></div>
    </AdminLayout>
  );
};

export default NewProduct;
