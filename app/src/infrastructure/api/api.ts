import axios from "axios";
import { BASE_URL } from "../../config/endpoints";

const api = axios.create({
  baseURL: BASE_URL, // Cambia esto por la URL de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
