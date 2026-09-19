import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import BarraNavegacion from "./components/organisms/BarraNavegacion";
import Inicio from "./components/pages/public/Inicio";

function App() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => console.error(e));
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
                  <div className="container mt-4">
                    <h4>Panel Operador</h4>
                    <p className="text-success">
                      Sesión iniciada correctamente como: <strong>{accounts[0]?.name}</strong>
                    </p>
                    {/* Aquí conectaremos el listado de los microservicios más adelante */}
                  </div>
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