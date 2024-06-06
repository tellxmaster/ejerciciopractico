import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import HomePage from "./presentation/pages/HomePage";
import ClientPage from "./presentation/pages/ClientPage";
import Navbar from "./presentation/components/common/Navbar";
import RegisterPage from "./presentation/pages/RegisterPage";
import LoginPage from "./presentation/pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
