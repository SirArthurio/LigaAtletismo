import React, { useState, useEffect } from "react";
import { Carta } from "../components/Card";
import { obtenerCarrito } from "../API/Data";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  useEffect(() => {
    const fetchCarrito = async () => {
      const data = await obtenerCarrito();
      setCarrito(data);
    };

    fetchCarrito();
  }, []);

  if (carrito.length === 0) {
    return (
      <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">El usuario no cuenta con un Carrito</h2>
      </div>
    );
  }

  return (
    <section>
      <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">CARRITO</h2>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {carrito.map((item, index) => (
          <Carta item={item} key={item._id} index={index} />
        ))}
      </div>
    </section>
  );
}
