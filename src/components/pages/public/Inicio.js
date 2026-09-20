import React, { useState } from "react";
import axios from "axios";

const Inicio = () => {
  const [codigo, setCodigo] = useState("");
  const [envio, setEnvio] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;

    setError("");
    setEnvio(null);
    setLoading(true);

    try {
      const res = await axios.get(`https://kjef9of8j7.execute-api.us-east-1.amazonaws.com/Desarrollo/api/shipments/tracking/${codigo.trim()}`);
      console.log("Respuesta recibida:", res.data);

      // Si el backend responde un Array [...], extraemos el primer elemento
      const data = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!data) {
        setError("No se encontró ningún envío con ese código.");
      } else {
        setEnvio(data);
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      if (err.response && err.response.status === 404) {
        setError("No se encontró ningún envío con ese código.");
      } else {
        setError("Error de conexión con el backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        <h2>Rastreo de Envíos - CourierPyme</h2>
        <p className="text">Consulta el estado de tu paquete en tiempo real</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label className="form-label fw-bold">Código de Seguimiento</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: ENV-1001"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-100">
          {loading ? "Buscando..." : "Consultar Estado"}
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {envio && (
        <div className="card shadow-sm border-success">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              Envío #{envio.codigo_seguimiento || envio.codigoSeguimiento}
            </h5>
          </div>
          <div className="card-body">
            <p className="mb-0">
              <strong>Estado actual:</strong>{" "}
              <span className="badge bg-primary fs-6">{envio.estado}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;