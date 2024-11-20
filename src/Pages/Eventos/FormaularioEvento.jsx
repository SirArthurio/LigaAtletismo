import React from "react";
import { Input } from "@nextui-org/react";

const FormularioEvento = ({
  nuevoEvento,
  setNuevoEvento,
  preview,
  handleFileChange,
  eventoEditado,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-center">
        {eventoEditado ? "Editar Evento" : "Registro de Evento"}
      </h2>
      <form className="grid grid-cols-2 gap-4 p-2">
        <Input
          isRequired
          label="Nombre del Evento:"
          value={nuevoEvento.name}
          className="max-w-xs"
          name="name"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Lugar del Evento:"
          value={nuevoEvento.place}
          className="max-w-xs"
          name="place"
          onChange={handleChange}
        />
        <label>Fecha del Evento</label>
        <input
          className="border p-2"
          type="date"
          name="date"
          value={nuevoEvento.date}
          onChange={handleChange}
        />
        <label>Descripción del Evento</label>
        <input
          className="border p-2"
          type="text"
          name="description"
          value={nuevoEvento.description}
          onChange={handleChange}
        />
        <label>Categoria</label>
        <input
          className="border p-2"
          type="text"
          name="category"
          value={nuevoEvento.category}
          onChange={handleChange}
        />
        <label>Imagen</label>
        <input
          className="p-2"
          type="file"
          name="img"
          onChange={handleFileChange}
        />

        {preview && (
          <div>
            <h3>Vista previa de la imagen:</h3>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
        )}


      </form>
    </div>
  );
};

export default React.memo(FormularioEvento);
