import React from "react";
import { Footer } from "../components/Footer";
import { CarruselImagenes, CarruselEvento } from "../components/Carrusel";
import "react-image-gallery/styles/css/image-gallery.css";
import backgroundImage from '../assets/Header/estadio-valledupar.jpg'; 

export const Inicio = () => {
  return (
    <div>
      <div
        className="bg-local h-64 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="text-center space-y-4 p-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          TEMPORADA 2024
        </h2>
        <p className="text-muted-foreground md:text-xl lg:text-base xl:text-xl">
          Obtenga las últimas actualizaciones sobre la temporada actual de la
          liga atlética, incluyendo clasificaciones de equipos, próximos
          eventos y resultados recientes.
        </p>
      </div>
      <section>
        <CarruselImagenes />
      </section>
      <section>
        <h2 className="bg-white text-center">Próximos Eventos</h2>
        <CarruselEvento />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
