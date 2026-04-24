import { useState } from "react";
import api from "../services/api";

function Login({ onLogin }) {
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
        })
      );

      localStorage.setItem("token", res.data.access_token);
      onLogin();
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;