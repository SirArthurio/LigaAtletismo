import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { ModalMensaje } from "../../components/Modal";
import TablaUser from "../../components/Tablas";

const entrenadores = [
  { nombre: "Albaro" },
  { nombre: "Toño" },
  { nombre: "Asd" },
];

export default function DeportistasCrud() {
  return (
    <div className="m-3 p-5 border-2 rounded-md">
      <section>
        <h2 className="text-center">Registro de Deportista</h2>
        <form className="grid grid-cols-2 p-2">
          <Input
            isRequired
            label="Nombre completo del deportista:"
            defaultValue=""
            className="max-w-xs p-2"
          />
          <Input
            isRequired
            label="Ingrese el tipo de evento:"
            defaultValue=""
            className="max-w-xs p-2"
          />
          <label className="p-2">Ingrese la fecha de nacimiento</label>
          <input className="border-1 p-2" type="date" name="fecha" />
          <label className="p-2">Imagen</label>
          <input className="p-2" type="file" name="imagen" />
          <Select
            label="Entrenador:"
            placeholder="¿Quién es tu entrenador?"
            className="max-w-xs"
          >
            {entrenadores.map((entrenador, index) => (
              <SelectItem key={index} value={entrenador.nombre}>
                {entrenador.nombre}
              </SelectItem>
            ))}
          </Select>
        </form>
        <ModalMensaje />{" "}
      </section>
      <section className="m-3 p-5 border-2 rounded-md">
        <TablaUser />
      </section>
    </div>
  );
}
