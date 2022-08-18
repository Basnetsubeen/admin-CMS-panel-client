import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoriesAction,
  getCategoriesAction,
} from "../../pages/categories/ CatefgoryAction";
import { useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const parentCategory = categories.filter(({ parentId }) => !parentId); // destructruing(item => !item.parentId)
  const childCategory = categories.filter(({ parentId }) => parentId); // destructruing(item => !item.parentId)
  return (
    <Row>
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
                  <td>{item.status}</td>
                  <td>{item.name}</td>
                  <td>{item.parentId ? "chidren" : "Parent"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deleteCategoriesAction(item._id))}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>

                {childCategory.map(
                  (child) =>
                    child.parentId === item._id && (
                      <tr key={child._id}>
                        <td>{child.status}</td>
                        <td>{child.name}</td>
                        <td>{child.parentId ? "chidren" : "Parent"}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              dispatch(deleteCategoriesAction(child._id))
                            }
                          >
                            Delete
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
