import React from 'react'
import { Prueba } from "../API/DataPrueba";
import { useParams } from 'react-router-dom'
import  Carta  from "../components/Card";

export const Producto = () => {
  const { id } = useParams();
  const ProductoFiltradoPorID = Prueba.find(item => item.id === parseInt(id));

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {ProductoFiltradoPorID ? (
        <Carta item={ProductoFiltradoPorID} key={ProductoFiltradoPorID.id} index={ProductoFiltradoPorID.id} />
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
};
