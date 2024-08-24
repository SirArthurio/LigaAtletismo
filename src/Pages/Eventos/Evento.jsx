import React from "react";
import { Prueba } from "../../API/DataPrueba.jsx";
import { useParams } from "react-router-dom";
import { FaCalendarAlt} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";



const FiltroEvento = () => {
  const { id } = useParams();
  const EventoFiltradoPorID = Prueba.find((item) => item.id === parseInt(id));

  return (
    <div>
      {EventoFiltradoPorID ? (
        <div className="flex-col justify-items-center ">
          <h2 className="text-center">{EventoFiltradoPorID.titulo}</h2>
          <div className="flex justify-center w-full">
            <img className="w-full	" src={EventoFiltradoPorID.img} alt="" />
          </div>

          <div className="justify-items-center  w-11/12	m-4 p-4 bg-emerald-100		rounded-lg		">
            
            <div className="flex flex-wrap">
            <FaCalendarAlt />
            <p className="ml-2">{EventoFiltradoPorID.fecha}</p>
            </div>
            <div className="flex flex-wrap">
            <IoLocationSharp />
            <p className="ml-2">{EventoFiltradoPorID.lugar}</p>
            </div>
            <p>{EventoFiltradoPorID.descripcion}</p>
            
          </div>
        </div>
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
    </div>
  );
};
