import React, { useState, useEffect } from "react";
import { obtenerUsuarioPerfil, actualizarUsuarioPerfil } from "../../API/Data";
import { useParams } from "react-router-dom";

export const Perfil = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await obtenerUsuarioPerfil(id);
        setUser(data);
        setFormData(data); // Sincronizar formData con los datos cargados
      } catch (err) {
        setError("Error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const response = await actualizarUsuarioPerfil(id, formData);
      setUser(response); // Actualiza el estado principal
      setIsEditing(false);
    } catch (err) {
      setError("Error al guardar los cambios.");
    }
  };

  // Mostrar carga o errores
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
              value={formData?.name || ""}
              onChange={handleChange}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <span className="ml-2">{user?.name}</span>
          )}
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="font-semibold">Correo Electrónico:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <span className="ml-2">{user?.email}</span>
          )}
        </div>

        {/* Teléfono */}
        <div className="mb-4">
          <label className="font-semibold">Teléfono:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData?.phone || ""}
              onChange={handleChange}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <span className="ml-2">{user?.phone}</span>
          )}
        </div>

        {/* Dirección */}
        <div className="mb-4">
          <label className="font-semibold">Dirección:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData?.address || ""}
              onChange={handleChange}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <span className="ml-2">{user?.address}</span>
          )}
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
