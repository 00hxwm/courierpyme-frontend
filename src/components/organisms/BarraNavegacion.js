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
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-dark px-4">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
        <svg 
  width="42" 
  height="30" 
  viewBox="0 0 92 56" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  className="me-2"
>
  <defs>
    <filter id="navGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  {/* Chasis negro oscuro con bordes rojo sangre */}
  <polygon
    points="2,42 10,14 48,14 66,28 84,28 88,42"
    fill="#121212"
    stroke="#8A0303"
    strokeWidth="2"
    strokeLinejoin="miter"
  />

  {/* Parabrisas tintado negro puro */}
  <polygon
    points="62,28 48,16 34,16 44,28"
    fill="#000000"
    stroke="#FF0033"
    strokeWidth="1.2"
  />

  {/* Ranura lateral roja estilo corte */}
  <line x1="8" y1="30" x2="52" y2="30" stroke="#8A0303" strokeWidth="2.5" strokeDasharray="12 4 4 2" />

  {/* Foco delantero afilado neón */}
  <polygon points="82,30 87,30 85,34 80,34" fill="#FF0033" filter="url(#navGlow)" />

  {/* Rueda trasera */}
  <circle cx="22" cy="42" r="7" fill="#080808" stroke="#8A0303" strokeWidth="2" />
  <circle cx="22" cy="42" r="2.5" fill="#FF0033" />

  {/* Rueda delantera */}
  <circle cx="68" cy="42" r="7" fill="#080808" stroke="#8A0303" strokeWidth="2" />
  <circle cx="68" cy="42" r="2.5" fill="#FF0033" />
</svg>
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