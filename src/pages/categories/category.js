import React from "react";
import AddCategoryForm from "../../components/category-form/AddCategoryForm";
import CategoryTable from "../../components/category-table/CategoryTable";
import AdminLayout from "../../components/layout/AdminLayout";

const category = () => {
  return (
    <div>
      <AdminLayout>
        <h2 className="py-3">Categories Management</h2>

        {/* form */}
        <AddCategoryForm />
        {/* table */}

        <CategoryTable />
      </AdminLayout>
    </div>
  );
};

export default category;
