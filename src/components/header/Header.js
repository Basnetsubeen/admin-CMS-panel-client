import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../../pages/login/userActions";
import { setShowSideMenu } from "../../pages/system-state/SytemSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.admin);
  const handleShow = () => dispatch(setShowSideMenu(true));

  const handleOnLogout = () => {
    dispatch(adminLogout());
    navigate("/");
  };

  return (
    <div>
      <Navbar collapseOnSelect bg="info" varaint="light " expand="md">
        <Container>
          <div>
            {user._id && (
              <i className="fa-solid fa-bars mx-3" onClick={handleShow}></i>
            )}

            <Navbar.Brand href="/">CMS</Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user._id ? (
                <>
                  <Link to="/admin-profile" className="nav-link">
                    <i class="fa-solid fa-user"></i> Profile
                  </Link>
                  <Link to="/" className="nav-link" onClick={handleOnLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
