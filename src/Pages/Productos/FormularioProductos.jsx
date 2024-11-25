import React from "react";
import { Input } from "@nextui-org/react";

const FormularioProducto = ({
  nuevoProducto = {},
  setNuevoProducto,
  preview,
  handleFileChange,
  productoEditado,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "size") {
      const sizesArray = value.split(",").map((size) => size.trim());
      setNuevoProducto((prevState) => ({
        ...prevState,
        size: sizesArray,
      }));
    } else {
      setNuevoProducto((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h2 className="text-center">
        {productoEditado ? "Editar Producto" : "Registro de Producto"}
      </h2>
      <form className="grid grid-cols-2 gap-4 p-2">
        <label htmlFor="name">Nombre del producto</label>
        <Input
          isRequired
          id="name"
          label="Nombre del producto"
          value={nuevoProducto.name || ""}
          className="max-w-xs"
          name="name"
          onChange={handleChange}
        />

        <label htmlFor="description">Descripción del producto</label>
        <Input
          isRequired
          id="description"
          label=""
          value={nuevoProducto.description || ""}
          name="description"
          onChange={handleChange}
        />

        <label htmlFor="size">Tamaños del producto</label>
        <Input
          isRequired
          id="size"
          label="(separados por comas)"
          value={nuevoProducto.size?.join(",") || ""}
          name="size"
          onChange={handleChange}
        />

        <label htmlFor="stock">Stock del producto</label>
        <Input
          isRequired
          id="stock"
          type="number"
          label=""
          value={nuevoProducto.stock || ""}
          name="stock"
          onChange={handleChange}
        />

        <label htmlFor="price">Precio del producto</label>
        <Input
          isRequired
          id="price"
          type="number"
          label="Precio del producto"
          value={nuevoProducto.price || ""}
          name="price"
          onChange={handleChange}
        />

        <label htmlFor="img">Imagen</label>
        <input
          isRequired
          id="img"
          className="p-2"
          type="file"
          name="img"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="col-span-2">
            <h3>Vista previa de la imagen:</h3>
            <img
              src={preview}
              alt="Vista previa"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default React.memo(FormularioProducto);
