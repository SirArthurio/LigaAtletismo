import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { obtenerEvento } from "../../API/Data";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import defaultImage from "../../assets/not_image.jpg";
import { Image, Button } from "@nextui-org/react";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const FiltroEvento = () => {
  const { id } = useParams();
  const [evento, setEventos] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [requisitoCumplido, setRequisitoCumplido] = useState(false);

  useEffect(() => {
    if (
      user?.levelUser === "Administrador" ||
      user?.levelUser === "Entrenador"
    ) {
      setRequisitoCumplido(true);
    } else {
      setRequisitoCumplido(false);
    }
  }, [user?.levelUser]);
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
            <Image
              src={
                evento.img && evento.img.length > 0
                  ? evento.img[0].secure_url
                  : defaultImage
              }
              alt={evento.name}
              className="w-full h-48 object-cover"
            />
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
          {requisitoCumplido && (
              <Button
                  onClick={() => navigate(`/Eventos/Evento/${evento._id}/Atletas`)}
              >
                Agregar Atleta al Evento
              </Button>
          )}
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
