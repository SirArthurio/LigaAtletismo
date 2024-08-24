import React from "react";

export function FormatoFecha({ fecha }) {
  const fechaValida = !isNaN(new Date(fecha).getTime());

  const fechaFormateada = fechaValida
    ? new Date(fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Fecha no disponible";

  return <span>{fechaFormateada}</span>;
}
