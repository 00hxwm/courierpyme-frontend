import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import BarraNavegacion from "./components/organisms/BarraNavegacion";
import Inicio from "./components/pages/public/Inicio";

// Idealmente, puedes mover este componente a src/components/pages/PanelOperador.jsx
const PanelOperador = () => {
  const { instance, accounts } = useMsal();
  const [envios, setEnvios] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="container mt-4">
      <h4>Panel Operador</h4>
      <p className="text-success">
        Sesión iniciada correctamente como: <strong>{accounts[0]?.name}</strong>
      </p>

      <div className="card p-4 mt-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Gestión de Envíos</h5>
          <button className="btn btn-primary" onClick={cargarEnvios}>
            Cargar Datos
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered">
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
                    <td>
                      <span className="badge bg-secondary">{envio.codigoSeguimiento}</span>
                    </td>
                    <td>{envio.destinatario}</td>
                    <td>{envio.direccion}</td>
                    <td>
                      <span className={`badge ${envio.estado === 'PENDIENTE' ? 'bg-warning' : 'bg-success'}`}>
                        {envio.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No hay envíos cargados. Presiona "Cargar Datos".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => console.error(e));
  };

  return (
    <Router>
      <BarraNavegacion />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route
            path="/admin"
            element={
              <>
                <UnauthenticatedTemplate>
                  <div className="alert alert-warning mt-4 text-center">
                    <h5>Acceso Restringido</h5>
                    <p>Necesitas credenciales corporativas para acceder al panel.</p>
                    <button className="btn btn-primary" onClick={handleLogin}>
                      Iniciar sesión con Microsoft
                    </button>
                  </div>
                </UnauthenticatedTemplate>

                <AuthenticatedTemplate>
                  <PanelOperador />
                </AuthenticatedTemplate>
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;