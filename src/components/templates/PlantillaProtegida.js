import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const PlantillaProtegida = () => {
  const location = useLocation();
  // Solución: Agregamos 'accounts' para poder leer los datos del usuario
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => console.error(e));
  };
  console.log("Datos de Microsoft:", accounts[0]?.idTokenClaims); //para verificar que se este reconociendo el login y rol de entra id

  return (
    <>
      
      <UnauthenticatedTemplate>
        <div className="container mt-5">
          <div className="alert alert-warning text-center shadow-sm p-5">
            <h4 className="fw-bold">Acceso Restringido</h4>
            <p>Necesitas credenciales corporativas para acceder al panel operativo de CourierPyme.</p>
            <button className="btn btn-primary mt-3" onClick={handleLogin}>
              Iniciar sesión con Microsoft
            </button>
          </div>
        </div>
      </UnauthenticatedTemplate>

     
      <AuthenticatedTemplate>
        <div className="d-flex" style={{ minHeight: '100vh' }}>
          
          {/* Sidebar Oscuro */}
          <div className="bg-dark text-white d-flex flex-column" style={{ width: '260px' }}>
            <div className="p-4">
              <h4 className="fw-bold mb-4">CourierPyme</h4>
              <ul className="nav flex-column gap-2">
                <li className="nav-item">
                  <Link to="/dashboard" className={`nav-link text-white rounded ${location.pathname === '/dashboard' ? 'bg-primary' : ''}`}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/shipments" className={`nav-link text-white rounded ${location.pathname === '/shipments' ? 'bg-primary' : ''}`}>Gestión de Envíos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Catalog" className={`nav-link text-white rounded ${location.pathname === '/Catalog' ? 'bg-primary' : ''}`}>Catalogo</Link>
                </li>
              </ul>
            </div>

            
            <div className="mt-auto p-4 border-top border-secondary">
              <div className="text-center mb-3">
                <small className="text-muted d-block">
                  
                  {accounts && accounts.length > 0 && accounts[0]?.idTokenClaims?.roles?.[0] 
                    ? accounts[0].idTokenClaims.roles[0] 
                    : "Usuario"}:
                </small>
                
                <strong className="text-white">
                  
                  {accounts && accounts.length > 0 ? accounts[0].name.toUpperCase() : "CARGANDO..."}
                </strong>
              </div>
              <div className="d-grid gap-2">
                <Link to="/" className="btn btn-outline-light btn-sm">Ir a Inicio Público</Link>
                <button className="btn btn-danger btn-sm" onClick={() => instance.logoutRedirect()}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

         
          <div className="flex-grow-1 bg-light p-4 overflow-auto">
            <Outlet /> 
          </div>

        </div>
      </AuthenticatedTemplate>
    </>
  );
};

export default PlantillaProtegida;