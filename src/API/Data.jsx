import axios from "axios";

const API_URL_Eventos = "http://localhost:3000/eventos";
const api_Carrito="http://localhost:3000/carrito/carrito";

export const obtenerEventos = async () => {
  try {
    const response = await axios.get(API_URL_Eventos);
    return response.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error, "status: 500");
    return [];
  }
};

export const obtenerCarrito = async () => {
  try {
    const response = await axios.get(api_Carrito);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error, "status: 500");
    return [];
  }
};
