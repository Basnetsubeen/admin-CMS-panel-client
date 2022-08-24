import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomModel } from "../model/CustomModel";
import { UpdateCategoriesAction } from "../../pages/categories/ CategoryAction";

// For mobile response

const EditCategoryForm = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const initialState = {
    status: "inactive",
    name: "",
    parentId: null,
  };
  const [form, setForm] = useState(initialState);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCategory);
  }, [selectedCategory]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { __v, slug, createdAt, updatedAt, ...rest } = form;
    dispatch(UpdateCategoriesAction(rest));
  };

  return (
    <CustomModel title="Edit Category">
      <Form
        className="py-4 mb-5 border p-3 shadow rounded"
        onSubmit={handleOnSubmit}
      >
        <h4 className="mb-3">Add new Category</h4>
        <Row className="g-2">
          <Col md="2">
            <Form.Group>
              <Form.Check
                name="status"
                label="status"
                type="switch"
                checked={form.status === "active"}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Select name="parentId" onChange={handleOnChange}>
                <option value="">Select Parent Category</option>
                {categories.length > 0 &&
                  categories.map(
                    (item) =>
                      !item.parentId && (
                        <option
                          value={item._id}
                          selected={item._id === form.parentId}
                        >
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter category name"
                required
              />
            </Form.Group>
          </Col>
          <Col md="2">
            <Form.Group>
              <Button variant="primary" type="submit">
                Update Category
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </CustomModel>
  );
};

export default EditCategoryForm;
