import axios from 'axios';

const API_URL = "http://localhost:3000/eventos";

export const obtenerEventos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return [];
  }
};
