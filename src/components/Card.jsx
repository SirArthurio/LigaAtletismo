import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Carta = ({ item, index }) => (
  <Card shadow="sm" key={index} isPressable>
    <Link to={`/Eventos/Evento/${item.id}`}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          className="w-full object-cover h-[140px]"
          src={item.img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between flex flex-col">
        <p>{item.product_name}</p>
        <p className="text-default-500">{item.category}</p>
      </CardFooter>
    </Link>
  </Card>
);

export default Carta;

