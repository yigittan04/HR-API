import { useNavigate } from "react-router-dom";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1 className="title">Home</h1>

          <div className="dashboard-buttons">
            <button
              className="nav-btn"
              onClick={() => navigate("/employees")}
            >
              Employees
            </button>

            <button
              className="nav-btn"
              onClick={() => navigate("/departments")}
            >
              Departments
            </button>

            <button
              className="logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;