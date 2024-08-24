import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FormatoFecha } from "./FormatoFecha.jsx";

export const Carta = ({ item, index }) => (
  <Card shadow="sm" key={index} isPressable>
    <Link to={`/Eventos/Evento/${item.id}`}>
      <CardHeader>
        <div className="absolute z-10 top-6 flex-col !items-start bg-white 	rounded-lg w-3/6		">
          <small>
            <FormatoFecha fecha={item.fecha} />
          </small>
        </div>

        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          className="z-0 w-full h-full object-cover"
          src={item.img}
        />
      </CardHeader>

      <CardFooter className="text-small justify-between flex flex-col">
        <p>{item.product_name}</p>
        <p className="text-default-500">{item.category}</p>
      </CardFooter>
    </Link>
  </Card>
);
