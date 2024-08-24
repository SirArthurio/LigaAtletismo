import React from "react";
import { Footer } from "../components/Footer";
import { CarruselImagenes, CarruselEvento } from "../components/Carrusel";
import "react-image-gallery/styles/css/image-gallery.css";
import backgroundImage from '../assets/Header/estadio-valledupar.jpg'; 
import Patrocinadores from "../components/Patrocinadores";

export const Inicio = () => {
  return (
    <div>
      <div
        className="bg-local h-64 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="text-center space-y-4 p-4 border rounded-lg p-2 m-2 bg-emerald-100 ">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          TEMPORADA 2024
        </h2>
        <p className="text-muted-foreground md:text-xl lg:text-base xl:text-xl">
          Obtenga las últimas actualizaciones sobre la temporada actual de la
          liga atlética, incluyendo clasificaciones de equipos, próximos
          eventos y resultados recientes.
        </p>
      </div>
      <section className="border rounded-lg p-2 m-2 ">
        <CarruselImagenes />
      </section>
      <section className="border rounded-lg p-2 m-2 bg-emerald-100 "  >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl p-2 text-center">Próximos Eventos</h2>
        <CarruselEvento />
      </section>
      <section className="border rounded-lg p-2 m-2">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl p-2 text-center">Nuestros Patrocinadores</h2>
        <Patrocinadores/>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
