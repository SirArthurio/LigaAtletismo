import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { obtenerNoticia } from "../../API/Data";
import { Image } from "@nextui-org/react";
import defaultImage from "../../assets/not_image.jpg";

const FiltroNoticia = () => {
  const { id } = useParams();
  const [noticia, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      const data = await obtenerNoticia(id);
      setNoticias(data);
    };

    fetchNoticias();
  }, []);

  return (
    <div>
      {noticia ? (
        <div className="justify-items-center">
          <h2 className="text-center">{noticia.name}</h2>
          <div className="flex justify-center items-center w-full">
            <Image
              src={
                noticia.img && noticia.img.length > 0
                  ? noticia.img[0].secure_url
                  : defaultImage
              }
              alt={noticia.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="justify-items-center w-11/12 m-4 p-4 bg-emerald-100 rounded-lg">
            <div className="flex flex-wrap">
              <FaCalendarAlt />
              <p className="ml-2">{noticia.date}</p>
            </div>
            <p>{noticia.description}</p>
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
