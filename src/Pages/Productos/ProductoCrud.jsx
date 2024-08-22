import React from "react";
import { Input, Button } from "@nextui-org/react";
import { ModalMensaje } from "../../components/Modal";

export default function ProductosCrud() {
  return (
    <div className="m-3 p-5 border-2 rounded-md">
      <h2 className="text-center ">Registro de Productos</h2>
      <form className="grid grid-cols-2 p-2">
        <Input
          isRequired
          label="Ingrese el nombre del evento:"
          defaultValue=""
          className="max-w-xs p-2"
        />
        <Input
          isRequired
          label="Ingrese el tipo de evento:"
          defaultValue=""
          className="max-w-xs p-2"
        />
        <label className="p-2">Ingrese la fecha del evento:</label>
        <input className="border-1 p-2" type="date" name="fecha" />
        <label className="p-2">Ingrese la hora del evento:</label>
        <input className="p-2" type="time" name="hora" />
        <label className="p-2"> Imagen</label>
        <input className="p-2" type="file" name="imagen" />

      </form>
      <ModalMensaje/>
    </div>
  );
}
