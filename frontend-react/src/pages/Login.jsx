import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/token",
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      onLogin(res.data.role);

      console.log(res.data);

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h1
          style={{
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          HR Management
        </h1>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <div style={{ height: 12 }} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <div style={{ height: 18 }} />

          <button
            type="submit"
            className="primary-btn"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;