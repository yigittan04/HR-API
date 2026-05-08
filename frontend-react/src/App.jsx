import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeTable from "./components/EmployeeTable";
import DepartmentTable from "./components/DepartmentTable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={login} />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard onLogout={logout} />
          </PrivateRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <EmployeeTable />
          </PrivateRoute>
        }
      />

      <Route
        path="/departments"
        element={
          <PrivateRoute>
            <DepartmentTable />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;