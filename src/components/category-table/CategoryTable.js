import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoriesAction,
  getCategoriesAction,
} from "../../pages/categories/ CategoryAction";
import { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { setModalShow } from "../../pages/system-state/SytemSlice.js";
import EditCategoryForm from "../category-form/EditCategoryForm.js";

const CategoryTable = () => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const handleOnEdit = (category) => {
    setSelectedCategory(category);
    dispatch(setModalShow());
  };
  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteCategoriesAction(_id));
    }
  };
  const parentCategory = categories.filter(({ parentId }) => !parentId); // destructruing(item => !item.parentId)
  const childCategory = categories.filter(({ parentId }) => parentId); // destructruing(item => !item.parentId)
  return (
    <Row>
      <EditCategoryForm selectedCategory={selectedCategory} />
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            parentCategory.map((item) => (
              <>
                <tr key={item._id} className="bg-info">
                  <td
                    className={
                      item.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.parentId ? "chidren" : "Parent"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>
                    {"  "}
                    <Button
                      variant="warning"
                      onClick={() => handleOnEdit(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>

                {childCategory.map(
                  (child) =>
                    child.parentId === item._id && (
                      <tr key={child._id}>
                        <td
                          className={
                            child.status === "active"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {child.status}
                        </td>
                        <td>{child.name}</td>
                        <td>{child.parentId ? "chidren" : "Parent"}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleOnDelete(child._id)}
                          >
                            Delete
                          </Button>
                          {"  "}
                          <Button
                            variant="warning"
                            onClick={() => handleOnEdit(child)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    )
                )}
              </>
            ))}
        </tbody>
      </Table>
    </Row>
  );
};

export default CategoryTable;
