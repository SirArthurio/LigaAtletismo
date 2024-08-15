import React from "react";
import { FiltroMayorValoracion } from "./Filtro";
import Carta from "../components/Card";

export const SideBar = () => {
  const Recomendacion = FiltroMayorValoracion();

  return <Carta item={Recomendacion} key={Recomendacion.id} />;
};
