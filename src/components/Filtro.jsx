import React, { useMemo } from "react";
import { Prueba } from "../API/DataPrueba";

const categoriasUnicas =
  (() => {
    return Prueba.map((item) => item.category).filter(
      (categoria, index, self) => self.indexOf(categoria) === index
    );
  },
  [Prueba]);

export const FiltroCategorias = () => {
  return categoriasUnicas;
};

const obtenerMayorValoracion = () => {
  return Prueba.reduce(
    (max, item) => (item.quantity > max.quantity ? item : max),
    Prueba[0]
  );
};

export const FiltroMayorValoracion = () => {
  const mayorValoracion = useMemo(obtenerMayorValoracion, [Prueba]);
  return mayorValoracion;
};