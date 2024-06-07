import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import HomePage from "./presentation/pages/user/HomePage";
import ClientPage from "./presentation/pages/admin/ClientPage";
import Navbar from "./presentation/components/common/Navbar";
import RegisterPage from "./presentation/pages/RegisterPage";
import LoginPage from "./presentation/pages/LoginPage";
import CustomerOrderPage from "./presentation/pages/admin/CustomerOrderPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/orders" element={<CustomerOrderPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
