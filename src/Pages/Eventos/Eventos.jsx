import React, { useState, useEffect } from "react";
import { obtenerEventos } from "../../API/Data";
import { Carta } from "../../components/Card";

function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const data = await obtenerEventos();
      setEventos(data);
    };

    fetchEventos();
  }, []);

  if (eventos.length === 0) {
    return <p>No hay eventos disponibles.</p>;
  }

  return (
    <div>
      <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">EVENTOS</h2>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {eventos.map((item, index) => (
          <Carta item={item} key={item.id} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Eventos;
