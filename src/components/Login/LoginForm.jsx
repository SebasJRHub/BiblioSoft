import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);

            navigate("/");

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="lf-container">
            <form onSubmit={handleSubmit}>
                <h2 className="lf-titulo">Bibliocraft</h2>
                <div className="lf-inputs">
                    <input
                        type="text"
                        placeholder="Usuario"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className="lf-icono" />
                </div>
                <div className="lf-inputs">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        required
                        value={password}              
                        onChange={(e) => setPassword(e.target.value)}  
                    />
                    <span
                        className="lf-iconoOjo"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <FaLock className="lf-icono" />
                </div>

                <div className="lf-recuperarCon">
                    <a href="">¿Olvidaste tu contraseña?</a>
                </div>

                <button type="submit" className="lf-boton">Iniciar Sesión</button>

                <div className="lf-registrar">
                    <p>¿No tienes una cuenta? <a href="">Regístrate</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;