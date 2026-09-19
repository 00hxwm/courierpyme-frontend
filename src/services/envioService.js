import axios from "axios";

const API_URL = "http://localhost:8080/api/envios";

export const getTrackingByCodigo = async (codigo) => {
  const response = await axios.get(`${API_URL}/tracking/${codigo}`);
  return response.data;
};

//centralizar la llamada http