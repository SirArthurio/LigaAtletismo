import React from "react";
import { Prueba } from "../API/DataPrueba";
import { useParams } from "react-router-dom";
import Carta from "../components/Card";

const FiltroEvento = () => {
  const { id } = useParams();
  const EventoFiltradoPorID = Prueba.find((item) => item.id === parseInt(id));

  return (
    <div>
      {EventoFiltradoPorID ? (
        <Carta
          item={EventoFiltradoPorID}
          key={EventoFiltradoPorID.id}
          index={EventoFiltradoPorID.id}
        />
      ) : (
        <p>Evento no encontrado</p>
      )}
    </div>
  );
};

export const Evento = () => {
  return (
    <div className="flex flex-col	justify-items-center			">
      <h2 className="text-center">Evento</h2>
      <FiltroEvento />
      <h2>Mas Informacion :D </h2>
      <div className="w-11/12		 h-dvh	m-4 p-4 bg-green-900	rounded-lg		"></div>
    </div>
  );
};
