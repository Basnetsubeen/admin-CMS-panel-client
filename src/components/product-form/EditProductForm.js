import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomInputField from "../../customInputField/CustomInputField";
import { useEffect, useState } from "react";
import { getCategoriesAction } from "../../pages/categories/ CategoryAction";
import { updateProductsAction } from "../../pages/products/productAction";

const initialState = {
  status: "inacitve",
  name: "",
  catId: null,

  sku: "",
  quantity: "",
  price: 0,
  salesPrice: 0,
  salesStartDate: null,
  salesEndDate: null,
  description: "",
  thumbnail: "",
};

const EditProductForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.product);
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
    const { sku, slug, rating, createdAt, updatedAt, __v, ...rest } = form;
    //append form data
    for (const key in rest) {
      formData.append(key, rest[key]);
    }
    //append images
    images.length &&
      [...images].map((img) => formData.append("newImages", img));
    //attach the item that need to be delete
    formData.append("imgToDelete", imgToDelete);
    dispatch(updateProductsAction(formData));
  };
  const handleOnImageDelete = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((img) => img !== value));
    }
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
      disabled: true,
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
                  item.parentId && (
                    <option value={item._id} selected={item._id === form.catId}>
                      {item.name}
                    </option>
                  )
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
        <div className="my-5 d-flex flex-wrap">
          {selectedProduct?.images &&
            selectedProduct.images.map((imgLink) => (
              <div className="p-1">
                <Form.Check
                  type="radio"
                  label="Use as thumbnail"
                  value={imgLink}
                  name="thumbnail"
                  onChange={handleOnChange}
                  checked={imgLink === form.thumbnail}
                />
                <img
                  src={process.env.REACT_APP_SERVER_ROOT + imgLink}
                  width="150px"
                  alt=""
                  crossOrigin="anonymous"
                />
                <Form.Check
                  label="Delete"
                  value={imgLink}
                  onChange={handleOnImageDelete}
                />
              </div>
            ))}
        </div>
        <Button variant="primary" type="submit">
          update product
        </Button>
      </Form>
      <hr />
    </div>
  );
};

export default EditProductForm;
