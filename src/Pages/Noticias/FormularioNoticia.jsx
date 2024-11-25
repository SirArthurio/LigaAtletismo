import React from "react";
import { Input } from "@nextui-org/react";

const FormularioNoticia = ({
  nuevaNoticia,
  setNuevaNoticia,
  preview,
  handleFileChange,
  noticiaEditada,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaNoticia((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-center">
        {noticiaEditada ? "Editar Noticia" : "Registro de Noticia"}
      </h2>
      <form className="grid grid-cols-2 gap-4 p-2">
      <label>Nombre de la noticia</label>
        <Input
          isRequired
          label="Nombre de la noticia:"
          value={nuevaNoticia.name}
          className="max-w-xs"
          name="name"
          onChange={handleChange}
        />
        <label>Fecha de la noticia</label>
        <input
          className="border p-2"
          type="date"
          name="date"
          value={nuevaNoticia.date}
          onChange={handleChange}
        />
        <label>Descripción de la noticia</label>
        <input
          className="border p-2"
          type="text"
          name="description"
          value={nuevaNoticia.description}
          onChange={handleChange}
        />
        <label>Categoria</label>
        <input
          className="border p-2"
          type="text"
          name="category"
          value={nuevaNoticia.category}
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

export default React.memo(FormularioNoticia);
