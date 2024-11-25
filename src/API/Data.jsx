import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const API_URL_Eventos = "http://localhost:3000/eventos";
const api_Carrito = "http://localhost:3000/carrito/carrito";

export const CrearFactura = async () => {
  try {
    const response = await API.post("/factura/create");
    return response.data;
  } catch (error) {
    console.error("Error al pagar:", error);
    return [];
  }
};

export const ObtenerFacturaUsuario = async () => {
  try {
    const response = await API.get("/factura/getuser");
    return response.data;
  } catch (error) {
    console.error("Error al obtener:", error);
    return [];
  }
};


//productos

export const obtenerProductos = async () => {
  try {
    const response = await API.get("/productos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};
export const obtenerProducto = async (id) => {
  try {
    const response = await API.get(`/productos/producto/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

//usuario

export const cerrarSesion = async () => {
  try {
    const response = await API.post("/login/logout");
    Swal.fire({
      icon: "success",
      title: "¡Sesión cerrada!",
      text: "Has cerrado sesión correctamente.",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.href = "/LigaAtletismo/Login";
    });

    return response;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al cerrar sesión. Por favor, inténtalo más tarde.",
      confirmButtonText: "Cerrar",
    });

    console.error("Error al cerrar sesión:", error);
    return [];
  }
};

export const obtenerUsuarioPerfil = async () => {
  try {
    const response = await API.get("/user/user/usuario");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return [];
  }
};

export const actualizarUsuarioPerfil = async (formData) => {
  try {
    const { name, documentType, password } = formData;
    if (!name || !documentType || !password) {
      throw new Error("Todos los campos son requeridos");
    }
    const response = await API.put(`/user/`, {
      name,
      documentType,  
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error inesperado al actualizar el perfil");
    }
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    throw new Error(error.message || "Error al actualizar el perfil del usuario");
  }
};

//Noticias

export const obtenerNoticia = async (id) => {
  try {
    const response = await API.get(`/noticias/noticia/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error, "status: 500");
    return [];
  }
};
export const obtenerNoticias = async () => {
  try {
    const response = await API.get(`/noticias`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error, "status: 500");
    return [];
  }
};

//EVENTOS

export const obtenerEvento = async (id) => {
  try {
    const response = await API.get(`/eventos/evento/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error, "status: 500");
    return [];
  }
};

export const obtenerEventos = async () => {
  try {
    const response = await axios.get(API_URL_Eventos);
    return response.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error, "status: 500");
    return [];
  }
};

//carrito

export const obtenerCarrito = async () => {
  try {
    const response = await axios.get(api_Carrito);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
      console.error("Código de estado:", error.response.status);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al realizar la solicitud:", error.message);
    }
    return [];
  }
};

export const eliminarDelCarrito = async (id) => {
  try {
    const response = await API.delete(`/carrito/carrito/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error, "status: 500");
    return [];
  }
};
