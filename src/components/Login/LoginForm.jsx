import React, {useState} from "react";
import './LoginForm.css';
import { FaUser ,FaLock, FaEye, FaEyeSlash} from "react-icons/fa";




const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className ="lf-container">
            <form action="">
                <h2 className="lf-titulo">Bibliocraft</h2>
                <div className="lf-inputs">
                    <input type="text" placeholder="Usuario" required />
                    <FaUser className="lf-icono" />
                </div>
                <div className="lf-inputs">
                    <input type={showPassword ? "text" : "password"}  placeholder="Contraseña" required />
                     <span className="lf-iconoOjo" onClick={() => setShowPassword(!showPassword)}>
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