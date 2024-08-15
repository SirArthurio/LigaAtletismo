import React from "react";
import { Prueba } from "../API/DataPrueba";
import  Carta  from "../components/Card";

function Eventos() {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {Prueba.map((item, index) => (
        <Carta item={item} key={item.id} index={index} />
      ))}
    </div>
  );
}

export default Eventos;
