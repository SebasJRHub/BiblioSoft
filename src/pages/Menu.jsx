import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="menu-container">
      <h2>Menú Principal</h2>
      <div className="menu-buttons">
        <button onClick={handleChangePassword}>Cambiar Contraseña</button>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Menu;
