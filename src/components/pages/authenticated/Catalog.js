import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from "axios";
import { loginRequest } from "../../../authConfig";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

const Catalog = () => {
  const { instance, accounts } = useMsal();
  const roles = accounts[0]?.idTokenClaims?.roles || [];
  const puedeVer = roles.includes("Admin") || roles.includes("Operador");

  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = async () => {
    const request = { ...loginRequest, account: accounts[0] };
    try {
      const r = await instance.acquireTokenSilent(request);
      return r.accessToken;
    } catch (e) {
      if (e instanceof InteractionRequiredAuthError) {
        const r = await instance.acquireTokenPopup(request);
        return r.accessToken;
      }
      throw e;
    }
  };

  useEffect(() => {
    if (!accounts[0] || !puedeVer) {
      setLoading(false);
      return;
    }
    const cargar = async () => {
      try {
        setError(null);
        const token = await getToken();
        const res = await axios.get(`${API_URL}/api/catalog/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServicios(res.data);
      } catch (e) {
        const status = e.response?.status;
        if (status === 401) setError("Sesión inválida o expirada (401).");
        else if (status === 403) setError("Tu rol no tiene permiso para ver el catálogo (403).");
        else setError("No se pudo cargar el catálogo.");
      } finally {
        setLoading(false);
      }
    };
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  if (!puedeVer) {
    return (
      <div className="alert alert-warning">
        Solo los roles Admin y Operador pueden ver el catálogo de servicios.
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="fw-bold mb-0">Catálogo de Servicios</h2>
        <p className="text-muted mb-0">Tipos de envío, tarifas y capacidad disponible</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0 p-4">
        {loading ? (
          <div className="text-center py-4">Cargando catálogo...</div>
        ) : servicios.length === 0 && !error ? (
          <div className="text-center py-4 text-muted">No hay servicios registrados.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Servicio</th>
                  <th>Descripción</th>
                  <th>Tarifa (CLP)</th>
                  <th>Capacidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id}>
                    <td className="fw-semibold">{s.nombre}</td>
                    <td>{s.descripcion}</td>
                    <td>${Number(s.tarifa).toLocaleString("es-CL")}</td>
                    <td>{s.capacidadDisponible}</td>
                    <td>
                      <span className={`badge ${s.activo ? "bg-success" : "bg-secondary"}`}>
                        {s.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Catalog;