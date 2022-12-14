import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../pages/products/productAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Prices</th>
            <th>Sales Price</th>
            <th>Sales Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={"http://localhost:8000/" + item.thumbnail}
                  alt=""
                  crossOrigin="anonymous"
                  width="130"
                />
              </td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.salesPrice}</td>
              <td>
                {item.salesStartDate && item.salesStartDate.substr(0, 10)}{" "}
                {item.salesStartDate ? "To" : "-"}{" "}
                {item.salesEndDate && item.salesEndDate.substr(0, 10)}
              </td>
              <td>
                <Link to={`/product/edit/${item._id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
