import React from "react";
import { Input, Button } from "@nextui-org/react";
import { ModalMensaje } from "../../components/Modal";
import TablaUser from "../../components/Tablas";

export default function NoticiasCrud() {
  return (
    <div className="m-3 p-5 border-2 rounded-md">
      <section>
        <h2 className="text-center ">Registro de Noticias</h2>
        <form className="grid grid-cols-2 p-2">
          <Input
            isRequired
            type="email"
            label="Ingrese el nombre del evento:"
            defaultValue=""
            className="max-w-xs p-2"
          />
          <Input
            isRequired
            type="email"
            label="Ingrese el tipo de evento:"
            defaultValue=""
            className="max-w-xs p-2"
          />
          <label className="p-2">Ingrese la fecha de la noticia:</label>
          <input className="border-1 p-2" type="date" name="fecha" />
          <label className="p-2">Ingrese el texto de la noticia:</label>
          <input className="p-2 border" type="string" name="hora" />
          <label className="p-2"> Imagen</label>
          <input className="p-2" type="file" name="imagen" />
        </form>
        <ModalMensaje />
      </section>
      <section className="m-3 p-5 border-2 rounded-md">
        <TablaUser />
      </section>
    </div>
  );
}
