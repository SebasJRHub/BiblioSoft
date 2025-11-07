import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setMessage("Inicio de sesión exitoso ✅");
        navigate("/menu"); // 🔹 Redirige al menú después de iniciar sesión
      } else {
        const error = await response.text();
        setMessage("Error: " + error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error al conectar con el servidor 😥");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // 🔹 Redirige a la pantalla de registro
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="login-button">
            Ingresar
          </button>
          <button
            type="button"
            className="register-button"
            onClick={handleRegister}
          >
            Registrar
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
