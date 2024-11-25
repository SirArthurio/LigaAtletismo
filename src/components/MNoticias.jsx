import React from "react";
import { Link } from "react-router-dom";
import { FormatoFecha } from "./FormatoFecha.jsx";
import { Image } from "@nextui-org/react";

export function MNoticias({ item }) {
  const maxLength = 100;

  const contenidoTruncado =
    item.description && item.description.length > maxLength
      ? item.description.slice(0, maxLength) + "..."
      : item.description || "Sin description disponible";

  return (
    <div className="flex flex-wrap border-b border-black p-2 m-2	">
      <div className="justify-start w-1/4 h-full">
        <Link to={`/Noticias/Noticia/${item._id}`}>
          <Image
            src={
              item.img && item.img.length > 0
                ? item.img[0].secure_url
                : defaultImage
            }
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        </Link>
      </div>
      <div className="flex-col">
        <h4 className="m-1 p-1">{item.name}</h4>
        <p className="m-1 p-1 w-full">{contenidoTruncado}</p>
        <p className="m-1 p-1">
          <small>
            <FormatoFecha fecha={item.date} />
          </small>
        </p>
      </div>
    </div>
  );
}
