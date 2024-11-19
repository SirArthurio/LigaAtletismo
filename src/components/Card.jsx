import React from "react";
import defaultImage from "../assets/not_image.jpg";
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
  <Card className="justify-center" shadow="sm" key={index} isPressable>
    <Link to={`/eventos/evento/${item._id}`}>
      <CardHeader className="h-1/4 w-full">
        <div className="absolute z-10 top-6 flex-col !items-start bg-white rounded-lg w-3/6">
          <small>
            <FormatoFecha fecha={item.date} />
          </small>
        </div>
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          height="200px"
          className="z-0 w-full h-full object-cover"
          src={item.img && item.img.length > 0 ? item.img[0].secure_url : defaultImage}
        />
      </CardHeader>

      <CardFooter className="text-small justify-between flex flex-col">
        <p>{item.name}</p>
        <p className="text-default-500">{item.category}</p>
      </CardFooter>
    </Link>
  </Card>
);
export const Carta3 = ({ item, index }) => (
  <Card className="justify-center" shadow="sm" key={index} isPressable>
    <Link to={`/productos/producto/${item._id}`}>
      <CardHeader className="h-1/4 w-full">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          height="200px"
          className="z-0 w-full h-full object-cover"
          src={item.img && item.img.length > 0 ? item.img[0].secure_url : defaultImage}
        />
      </CardHeader>

      <CardFooter className="text-small justify-between flex flex-col">
        <p>{item.name}</p>
        <p className="text-default-500">{item.category}</p>
      </CardFooter>
    </Link>
  </Card>
);

export const Carta2 = ({ item, index }) => (
  <Card className="justify-center" shadow="sm" key={index} isPressable>
    <Link to={`/Admin/${item.nombre}`}>
      <CardHeader className="relative h-1/4 w-full group overflow-hidden">
        <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-80 rounded-lg text-center">
          {item.nombre}
        </div>
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          height="200px"
          className=" z-0 relative w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105  transition-all duration-500 ease-in-out"
          src={item.img}
        />
      </CardHeader>
    </Link>
  </Card>
);



