import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../../authConfig";

const Dashboard = () => {
  const { instance, accounts } = useMsal();
  const [envios, setEnvios] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = () => {
    instance.logoutRedirect().catch(e => console.error(e));
  };

  const cargarEnvios = async () => {
    try {
      const responseToken = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      });

      const response = await fetch("http://localhost:8080/api/envios", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${responseToken.accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEnvios(data);
        setError("");
      } else {
        setError("Error del servidor: " + response.status);
      }
    } catch (error) {
      console.error(error);
      setError("Error de red o de autenticación.");
    }
  };

  // Cargar datos automáticamente al montar el componente
  useEffect(() => {
    cargarEnvios();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px' }}>
        <h4 className="mb-4">CourierPyme</h4>
        <hr />
        
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link to="/admin" className="nav-link active bg-primary text-white">
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/envios" className="nav-link text-white">
              Gestión de Envíos
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/rutas" className="nav-link text-white">
              Rutas y Despachos
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/operadores" className="nav-link text-white">
              Operadores
            </Link>
          </li>
        </ul>

        <hr />
        
        <div className="mt-auto">
            <p className="small text-center mb-3">
              Operador: <br/><strong>{accounts[0]?.name}</strong>
            </p>
            <Link to="/" className="btn btn-dark w-100 mb-2 border text-start">
                Ir a Inicio Público
            </Link>
            <button onClick={handleLogout} className="btn btn-danger w-100 text-start">
                Cerrar Sesión
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light p-4">
        <h2 className="fw-bold">Dashboard Operativo</h2>
        <p className="text-muted">Resumen de las actividades logísticas diarias</p>

        {/* Tarjetas de Métricas (Calculadas dinámicamente) */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3 h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title">Total Envíos</h5>
                        <h2 className="fw-bold">{envios.length}</h2>
                    </div>
                </div>
                <p className="card-text small mt-2">Registrados en el sistema</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3 h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title">En Tránsito</h5>
                        <h2 className="fw-bold">
                          {envios.filter(e => e.estado === 'EN_TRANSITO').length}
                        </h2>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-success mb-3 h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title">Entregados</h5>
                        <h2 className="fw-bold">
                          {envios.filter(e => e.estado === 'ENTREGADO').length}
                        </h2>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Datos */}
        <div className="card p-4 shadow-sm border-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Últimos Envíos Registrados</h5>
            <button className="btn btn-primary" onClick={cargarEnvios}>
              Actualizar Datos
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Código</th>
                  <th>Destinatario</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {envios.length > 0 ? (
                  envios.map((envio) => (
                    <tr key={envio.id}>
                      <td>{envio.id}</td>
                      <td><span className="badge bg-secondary">{envio.codigoSeguimiento}</span></td>
                      <td>{envio.destinatario}</td>
                      <td>{envio.direccion}</td>
                      <td>
                        <span className={`badge ${
                          envio.estado === 'PENDIENTE' ? 'bg-secondary' : 
                          envio.estado === 'EN_TRANSITO' ? 'bg-warning text-dark' : 'bg-success'
                        }`}>
                          {envio.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No hay envíos cargados en la base de datos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;