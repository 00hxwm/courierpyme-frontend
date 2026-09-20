import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
// Ajusta esta ruta dependiendo de dónde esté exactamente tu authConfig.js
import { loginRequest } from "../../authConfig"; 

const BarraNavegacion = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    // Redirige al login de Microsoft Entra ID
    instance.loginRedirect(loginRequest).catch((e) => console.error(e));
  };

  const handleLogout = () => {
    // Limpia la sesión de Microsoft de forma segura
    instance.logoutRedirect().catch((e) => console.error(e));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
        <img 
          src="/images/logo.png" /* Asegúrate de que el nombre coincida */
          alt="Logo CourierPyme" 
          height="40" 
          className="me-2" 
        />
          <span className="fw-bold text-primary">CourierPyme</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Servicios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            
            
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link text-success fw-bold" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            )}
              
            {isAuthenticated ? (
                <>
                    <li className="nav-item ms-2">
                        <span className="nav-link fw-bold text-primary">
                            {accounts[0]?.name}
                        </span>
                    </li>
                    <li className="nav-item ms-2">
                        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item ms-2">
                        
                        <button className="btn btn-outline-primary" onClick={handleLogin}>
                            Ingresar con Microsoft
                        </button>
                    </li>
                </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;