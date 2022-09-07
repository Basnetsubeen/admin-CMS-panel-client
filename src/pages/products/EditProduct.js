import React from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsAction, getSingleProductsAction } from "./productAction";
import EditProductForm from "../../components/product-form/EditProductForm";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { selectedProduct } = useSelector((state) => state.product);

  useEffect(() => {
    _id && dispatch(getSingleProductsAction(_id));
  }, [_id, dispatch]);

  const handleOnDelete = () => {
    if (window.confirm("Are you sure you want to this product?")) {
      const { thumbnail, images } = selectedProduct;
      const imgs = [thumbnail, ...images]; //to prevent duplication of images we use set(imgs).
      deleteProductsAction(_id, [...new Set(imgs)]);
    }
  };

  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/product">
          <Button variant="primary">
            <i className="fa-solid fa-angle-left"></i> Back
          </Button>
        </Link>
      </div>
      <h2>Update Product</h2>
      <hr />

      <div className="">
        <EditProductForm />
      </div>
      <div className="text-end py-3">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete Product
        </Button>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
