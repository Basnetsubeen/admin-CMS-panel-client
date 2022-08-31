import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminRegistration from "./pages/admin-registration/AdminRegistration";
import EmailVerification from "./pages/admin-registration/EmailVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/products/Product";
import Category from "./pages/categories/category";
import PrivateRouter from "./components/private-router/PrivateRouter";
import PaymentMethod from "./pages/payment-method/PaymentMethod";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* private routers */}
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
          ></Route>

          <Route
            path="/product"
            element={
              <PrivateRouter>
                <Product />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/category"
            element={
              <PrivateRouter>
                <Category />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/payment-method"
            element={
              <PrivateRouter>
                <PaymentMethod />
              </PrivateRouter>
            }
          ></Route>

          {/* public routers */}
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<AdminRegistration />}></Route>
          <Route
            path="/admin/verify-email"
            element={<EmailVerification />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
