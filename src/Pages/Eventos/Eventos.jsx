import React from "react";
import { Prueba } from "../../API/DataPrueba";
import  {Carta}  from "../../components/Card";

function Eventos() {
  return (
    <div>
      <div className="w-full	h-1/3	m-4 p-4 bg-red-600	rounded-lg">
        <h2 className="text-center text-white	">EVENTOS</h2>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {Prueba.map((item, index) => (
        <Carta item={item} key={item.id} index={index} />
      ))}
    </div>
    </div>
    
  );
}

export default Eventos;
