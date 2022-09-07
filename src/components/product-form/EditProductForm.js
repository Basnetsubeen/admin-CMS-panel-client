import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomInputField from "../../customInputField/CustomInputField";
import { useEffect, useState } from "react";
import { getCategoriesAction } from "../../pages/categories/ CategoryAction";
import { postProductsAction } from "../../pages/products/productAction";

const initialState = {
  status: "inacitve",
  catId: null,
  name: "",
  sku: "",
  quantity: "",
  price: 0,
  salesPrice: 0,
  salesStartDate: null,
  salesEndDate: null,
  description: "",
};

const EditProductForm = () => {
  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);
  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
    setForm(selectedProduct);
  }, [categories, dispatch, selectedProduct]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    setImages(files);
    console.log(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //set data with FromData
    const formData = new FormData();
    //append form data
    for (const key in form) {
      formData.append(key, form[key]);
    }
    //append images
    images.length && [...images].map((img) => formData.append("images", img));
    dispatch(postProductsAction(formData));
  };
  const inputFields = [
    {
      name: "name",
      value: form.name,
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
    },

    {
      name: "sku",
      value: form.sku,
      label: "SKU",
      type: "text",
      placeholder: "Products unique code",
      required: true,
    },
    {
      name: "quantity",
      value: form.quantity,
      label: "Quantity",
      type: "number",
      placeholder: "QTY",
      required: true,
    },
    {
      name: "price",
      value: form.price,
      label: "price",
      type: "number",
      placeholder: "343",
      min: 1,
      required: true,
    },
    {
      name: "salesPrice",
      value: form.salesPrice,
      label: "Sales Price",
      type: "number",
      placeholder: "Product Name",
    },
    {
      name: "salesStartDate",
      value: form.salesStartDate,
      label: "Sales start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      value: form.salesEndDate,
      label: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      value: form.description,
      label: "Description",
      type: "text",
      as: "textarea",
      rows: 10,
      placeholder: "343",
      required: true,
    },

    {
      name: "images",
      type: "file",
      accept: "images/*",
      multiple: true,
    },
  ];
  return (
    <div>
      <Form
        className="py-5"
        onSubmit={handleOnSubmit}
        encType="multipart/form-data"
      >
        <Form.Group className="mb-5">
          <Form.Label>Assign Category</Form.Label>
          <Form.Check
            name="status"
            type="switch"
            label="status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          ></Form.Check>
        </Form.Group>
        <Form.Group className="py-3">
          <Form.Select name="catId" onChange={handleOnChange} required>
            <option value="">Select a Category</option>
            {categories.length > 0 &&
              categories.map(
                (item) =>
                  item.parentId && <option value={item._id}>{item.name}</option>
              )}
          </Form.Select>
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInputField
            key={i}
            {...item}
            onChange={
              item.name === "images" ? handleOnImageSelect : handleOnChange
            }
          />
        ))}
        <Button variant="primary" type="submit">
          Submit product
        </Button>
      </Form>
    </div>
  );
};

export default EditProductForm;
