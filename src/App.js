import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminRegistration from "./pages/admin-registration/AdminRegistration";
import EmailVerification from "./pages/admin-registration/EmailVerification";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<AdminRegistration />}></Route>
          <Route
            path="/admin/verify-email"
            element={<EmailVerification />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
