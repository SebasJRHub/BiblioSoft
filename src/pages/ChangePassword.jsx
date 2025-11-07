import React, { useState } from "react";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,30}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordRegex.test(newPassword)) {
      setMessage(
        "La nueva contraseña debe tener entre 8 y 30 caracteres, incluir una mayúscula, un número y un símbolo."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden ❌");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Contraseña cambiada con éxito ✅");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Redirigir rápidamente al menú (1 segundo)
        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un error al conectar con el servidor ❌");
    }
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Cambio de contraseña cancelado ❎");
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  return (
    <div className="login-container">
      <h2>Cambiar Contraseña</h2>
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

        <div className="form-group">
          <label>Confirmar nueva contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="change-password-button">
            Cambiar contraseña
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

export default ChangePassword;
