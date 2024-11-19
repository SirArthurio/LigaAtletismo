import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { obtenerEvento } from "../../API/Data";
import { FaCalendarAlt} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const FiltroEvento = () => {
  const { id } = useParams();
  const [evento, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const data = await obtenerEvento(id);
      setEventos(data);
    };

    fetchEventos();
  }, []);
  
  

  return (
    <div>
      {evento ? (
        <div className="flex-col justify-items-center ">
          <h2 className="text-center">{evento.name}</h2>
          <div className="flex justify-center w-full">
            <img className="w-full	" src={evento.img} alt="" />
          </div>

          <div className="justify-items-center  w-11/12	m-4 p-4 bg-emerald-100		rounded-lg		">
            
            <div className="flex flex-wrap">
            <FaCalendarAlt />
            <p className="ml-2">{evento.date}</p>
            </div>
            <div className="flex flex-wrap">
            <IoLocationSharp />
            <p className="ml-2">{evento.place}</p>
            </div>
            <p>{evento.description}</p>
            
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
