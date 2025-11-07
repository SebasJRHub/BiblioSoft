import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,30}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordRegex.test(password)) {
      setMessage(
        "La contraseña debe tener entre 8 y 30 caracteres, incluir una mayúscula, un número y un símbolo."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage("Usuario registrado exitosamente ✅");
        setUsername("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/"); // redirige al login
        }, 2000);
      } else {
        const errorText = await response.text();
        if (errorText.includes("ya está en uso")) {
          setMessage("❌ El nombre de usuario ya está en uso");
        } else {
          setMessage("Error: " + errorText);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Error al conectar con el servidor 😥");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setMessage("Registro cancelado ❎");
    setTimeout(() => {
      navigate(-1); // retrocede a la página anterior
    }, 500);
  };

  return (
    <div className="login-container">
      <h2>Registrar Usuario</h2>
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

        <div className="form-group">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="login-button">
            Registrar
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
