import React from "react";
import { Prueba } from "../../API/DataPrueba";
import  Carta  from "../../components/Card";

export const Productos=()=> {
  return (
    <div >
       {Prueba.map((item, index) => (
        <Carta item={item} key={item.id} index={index} />
      ))}
    </div>
  );
};
