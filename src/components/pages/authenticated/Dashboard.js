import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig"; 

const Dashboard = () => {
  const { instance, accounts } = useMsal();
  const [envios, setEnvios] = useState([]);
  const [error, setError] = useState("");

  const cargarEnvios = async () => {
    try {
      const responseToken = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      });

      const response = await fetch("http://localhost:8081/api/bff/envios", {
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

  useEffect(() => {
    cargarEnvios();
  }, []);

  return (
    <>
      <h2 className="fw-bold">Dashboard</h2>
      <p className="text-muted">Resumen de las actividades logísticas</p>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3 h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">Total Envíos</h5>
              <h2 className="fw-bold">{envios.length}</h2>
              <p className="card-text small mt-2">Registrados en el sistema</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-dark bg-warning mb-3 h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">En Tránsito / Ruta</h5>
              <h2 className="fw-bold">
                {envios.filter(e => e.estado === 'EN_TRANSITO' || e.estado === 'EN_RUTA').length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3 h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">Entregados</h5>
              <h2 className="fw-bold">
                {envios.filter(e => e.estado === 'ENTREGADO').length}
              </h2>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card p-4 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Últimos Envíos Registrados (Desde BFF)</h5>
          <button className="btn btn-primary" onClick={cargarEnvios}>
            Actualizar Datos
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Destinatario</th>
                <th>Dirección</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {envios.length > 0 ? (
                envios.map((envio, index) => (
                  <tr key={index}> 
                    <td>{index + 1}</td>
                    <td><span className="badge bg-secondary">{envio.codigoSeguimiento}</span></td>
                    <td>{envio.destinatario}</td>
                    <td>{envio.direccion}</td>
                    <td>
                      <span className={`badge ${
                        envio.estado === 'PENDIENTE' ? 'bg-secondary' : 
                        (envio.estado === 'EN_TRANSITO' || envio.estado === 'EN_RUTA') ? 'bg-warning text-dark' : 'bg-success'
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
    </>
  );
};

export default Dashboard;