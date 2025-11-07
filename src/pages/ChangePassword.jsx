import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // elimina el JWT
    window.location.href = "/"; // redirige al login
  };

  // 🔹 Función para enviar solicitud al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // obtiene el JWT
      const response = await fetch("http://localhost:8080/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Contraseña cambiada con éxito ✅");
        // 🔹 Limpia el token y redirige al login
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }, 2000);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un error al conectar con el servidor ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <h2>Cambiar Contraseña</h2>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Contraseña actual</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="change-password-button">
          Cambiar contraseña
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;
