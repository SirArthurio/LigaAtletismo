import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // Permite el envío de cookies

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  // Verifica si el usuario sigue autenticado
  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/me"); // Cambia al endpoint correcto
      if (response.status === 200 && response.data.user) {
        setUser(response.data.user); 
        console.log(response.data.user);
      } else {
        setUser(null); // Si no hay usuario válido, resetea el estado
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
      setUser(null);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  useEffect(() => {
    checkUser(); // Realiza la verificación al cargar
  }, []);

  if (loading) {
    return <div>Verificando sesión...</div>; // Puedes agregar un spinner aquí
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
