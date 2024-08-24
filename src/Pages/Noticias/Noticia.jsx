import React from "react";
import { Prueba } from "../../API/DataPrueba.jsx";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const FiltroNoticia = () => {
  const { id } = useParams();
  const NoticiaFiltradoPorID = Prueba.find((item) => item.id === parseInt(id));

  return (
    <div>
      {NoticiaFiltradoPorID ? (
        <div className="justify-items-center">
          <h2 className="text-center">{NoticiaFiltradoPorID.titulo}</h2>
          <div className="flex justify-center items-center w-full">
            <img className="max-w-full h-auto" src={NoticiaFiltradoPorID.img} alt={NoticiaFiltradoPorID.titulo} />
          </div>
          <div className="justify-items-center w-11/12 m-4 p-4 bg-emerald-100 rounded-lg">
            <p>{NoticiaFiltradoPorID.descripcion}</p>
          </div>
        </div>
      ) : (
        <p>Noticia no encontrada</p>
      )}
    </div>
  );
};

export const Noticia = () => {
  return (
    <div className="flex flex-col justify-items-center">
      <h2 className="text-center">Noticia</h2>
      <FiltroNoticia />
    </div>
  );
};

