import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from "axios";
import { loginRequest } from "../../../authConfig";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

// Debe coincidir con EstadoEnvio.java del backend
const SIGUIENTES = {
  CREADO: ["ACEPTADO", "CANCELADO"],
  ACEPTADO: ["EN_BODEGA", "CANCELADO"],
  EN_BODEGA: ["EN_RUTA", "CANCELADO"],
  EN_RUTA: ["ENTREGADO"],
  ENTREGADO: [],
  CANCELADO: [],
};

const BADGES = {
  CREADO: "bg-secondary",
  ACEPTADO: "bg-info text-dark",
  EN_BODEGA: "bg-primary",
  EN_RUTA: "bg-warning text-dark",
  ENTREGADO: "bg-success",
  CANCELADO: "bg-danger",
};

const Shipments = () => {
  const { instance, accounts } = useMsal();
  const roles = accounts[0]?.idTokenClaims?.roles || [];
  const tieneRol = (...requeridos) => requeridos.some((r) => roles.includes(r));
  const puedeCrear = tieneRol("Admin", "Operador", "Cliente");
  const puedeCambiarEstado = tieneRol("Admin", "Operador");

  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLista, setErrorLista] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoDestinatario, setNuevoDestinatario] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      cargarEnvios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, instance]);

  // Access token para la API; si no se puede renovar en silencio, pide login por popup
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

  const mensajeError = (error, porDefecto) => {
    const status = error.response?.status;
    const detalle = error.response?.data?.error;
    if (status === 401) return "Sesión inválida o expirada (401). Vuelve a iniciar sesión.";
    if (status === 403) return "Tu rol no tiene permiso para esta operación (403).";
    return detalle ? `${porDefecto} ${detalle}` : porDefecto;
  };

  const cargarEnvios = async () => {
    try {
      setErrorLista(null);
      const token = await getToken();
      const res = await axios.get(`${API_URL}/api/shipments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnvios(res.data);
    } catch (error) {
      console.error("Error al obtener los envíos:", error);
      setErrorLista(mensajeError(error, "No se pudieron cargar los envíos."));
    } finally {
      setLoading(false);
    }
  };

  const handleCrearEnvio = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const token = await getToken();
      // El backend asigna estado CREADO y el código de seguimiento
      await axios.post(
        `${API_URL}/api/shipments`,
        { destinatario: nuevoDestinatario, direccion: nuevaDireccion },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      setNuevoDestinatario("");
      setNuevaDireccion("");
      setMostrarFormulario(false);
      cargarEnvios();
    } catch (error) {
      console.error("Error al crear el envío:", error);
      alert(mensajeError(error, "Hubo un error al guardar el envío."));
    } finally {
      setGuardando(false);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    if (!window.confirm(`¿Cambiar el estado a ${nuevoEstado}?`)) return;
    try {
      const token = await getToken();
      await axios.put(
        `${API_URL}/api/shipments/${id}/status`,
        { status: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      cargarEnvios();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert(mensajeError(error, "Hubo un error al actualizar el envío."));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Gestión de Envíos</h2>
          <p className="text-muted mb-0">Administra y rastrea las encomiendas</p>
        </div>

        {puedeCrear && (
          <button
            className={`btn shadow-sm ${mostrarFormulario ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Cancelar" : "+ Nuevo Envío"}
          </button>
        )}
      </div>

      <div className="alert alert-info border-0 shadow-sm">
        <i className="bi bi-info-circle me-2"></i>
        Estás viendo esta pantalla con los permisos del rol:{" "}
        <strong>{roles.length > 0 ? roles.join(", ") : "sin rol asignado"}</strong>
      </div>

      {errorLista && <div className="alert alert-danger">{errorLista}</div>}

      {mostrarFormulario && (
        <div className="card shadow-sm border-0 p-4 mb-4 bg-light">
          <h5 className="fw-bold mb-3">Registrar Nuevo Envío</h5>
          <form onSubmit={handleCrearEnvio}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Destinatario</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoDestinatario}
                  onChange={(e) => setNuevoDestinatario(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Dirección de Entrega</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevaDireccion}
                  onChange={(e) => setNuevaDireccion(e.target.value)}
                  placeholder="Ej: Av. Providencia 1234, Santiago"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar Envío"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card shadow-sm border-0 p-4">
        <div className="table-responsive">
          {loading ? (
            <div className="text-center py-4">Cargando envíos...</div>
          ) : envios.length === 0 ? (
            <div className="text-center py-4 text-muted">No hay envíos registrados.</div>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Destinatario</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {envios.map((envio) => (
                  <tr key={envio.id}>
                    <td><span className="badge bg-secondary">{envio.codigoSeguimiento}</span></td>
                    <td>{envio.destinatario}</td>
                    <td>{envio.direccion}</td>
                    <td>
                      <span className={`badge ${BADGES[envio.estado] || "bg-dark"}`}>
                        {envio.estado}
                      </span>
                    </td>
                    <td>
                      {puedeCambiarEstado &&
                        (SIGUIENTES[envio.estado] || []).map((sig) => (
                          <button
                            key={sig}
                            className={`btn btn-sm me-2 ${
                              sig === "CANCELADO" ? "btn-outline-danger" : "btn-outline-success"
                            }`}
                            onClick={() => handleCambiarEstado(envio.id, sig)}
                          >
                            {sig}
                          </button>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Shipments;