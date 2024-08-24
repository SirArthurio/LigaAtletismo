import React from "react";
import { Link } from "react-router-dom";
import { FormatoFecha } from "./FormatoFecha.jsx"; 

export function MNoticias({ item }) {
  const maxLength = 100;

  const contenidoTruncado =
    item.contenido && item.contenido.length > maxLength
      ? item.contenido.slice(0, maxLength) + "..."
      : item.contenido || "Sin contenido disponible";

  return (
    <div className="flex flex-wrap border-b border-black p-2 m-2	">
      <div className="justify-start w-1/4 h-full">
        <Link to={`/Noticias/Noticia/${item.id}`}>
          {item.img && <img src={item.img} alt={item.titulo} />}
        </Link>
      </div>  
      <div className="flex-col">
        <h4 className="m-1 p-1">{item.titulo}</h4>
        <p className="m-1 p-1 w-full">{contenidoTruncado}</p>
        <p className="m-1 p-1">
          <small>
            <FormatoFecha fecha={item.fecha} />
          </small>
        </p>
      </div>
    </div>
  );
}

