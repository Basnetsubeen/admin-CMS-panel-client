import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SideMenu from "../side-menu/SideMenu";

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* headers */}
      <Header></Header>
      {/* Side bar */}
      <SideMenu></SideMenu>
      {/* main body */}
      <main style={{ minHeight: "70vh" }} className="container">
        {children}
      </main>

      {/* footer */}
      <Footer></Footer>
    </div>
  );
};

export default AdminLayout;
