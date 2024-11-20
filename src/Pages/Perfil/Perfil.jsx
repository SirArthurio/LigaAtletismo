import React, { useState, useEffect } from "react";
import { obtenerUsuarioPerfil, actualizarUsuarioPerfil } from "../../API/Data";
import { useParams } from "react-router-dom";

export const Perfil = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ObtenerUsuario = async () => {
    try {
      const data = await obtenerUsuarioPerfil(); 
      setUser(data);
      setFormData(data); 
    } catch (err) {
      setError("Error al cargar los datos del usuario.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ObtenerUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await actualizarUsuarioPerfil(formData);
      if (response.status === 200) {
        setUser(response.data);  
        setIsEditing(false);
        ObtenerUsuario();  
      } else {
        console.error(`Error al actualizar: ${response.status}`);
      }
    } catch (err) {
      setError("Error al guardar los cambios.");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Perfil de Usuario</h1>
      <div className="bg-white shadow-md rounded-lg p-5">
        {/* Nombre */}
        <div className="mb-4">
          <label className="font-semibold">Nombre:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <span className="ml-2">{user?.name}</span>
          )}
        </div>

        {/* Nivel de usuario */}
        <div className="mb-4">
          <label className="font-semibold">Nivel de usuario:</label>
          <span className="ml-2">{user?.levelUser}</span>
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="font-semibold">Usuario:</label>
          <span className="ml-2">{user?.user}</span>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Guardar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
