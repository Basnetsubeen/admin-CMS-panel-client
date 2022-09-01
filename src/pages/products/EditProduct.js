import React from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsAction, getSingleProductsAction } from "./productAction";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

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
  const { selectedProduct } = useSelector((state) => state.product);
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

      <div className="">Edit Product Form Goes Here</div>
      <div className="text-end py-3">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete Product
        </Button>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
