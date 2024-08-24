import React from "react";
import { Prueba } from "../API/DataPrueba";

const MoldeSobreNosotros = ({ item }) => {
  return (
    <div className="border flex justify-center flex-col rounded-lg">
      <div className="flex justify-center">
        <img
          className="rounded-full w-1/2 m-4 p-1"
          src={item.img}
          alt={item.nombre}
        />
      </div>

      <h2>{item.nombre}</h2>
      <p className="font-light">{item.cargo}</p>
    </div>
  );
};

export function SobreNosotros() {
  return (
    <div className="justify-items-center">
      <div className="bg-emerald-100 rounded-lg m-4	">
        <h2 className="text-3xl text-center mt-2 pt-2">Sobre Nosotros</h2>
        <p className="m-8">
          La Liga de Atletismo del Cesar es una organización comprometida con el
          desarrollo y la promoción del atletismo en nuestra región. Desde
          nuestra fundación, hemos trabajado incansablemente para formar atletas
          de alto rendimiento, fomentando los valores de la disciplina, el
          esfuerzo y la superación personal. Nos enorgullece ser una plataforma
          para el talento local, impulsando a nuestros deportistas a competir a
          nivel nacional e internacional, representando con orgullo al Cesar. A
          través de entrenamientos rigurosos, eventos deportivos y programas de
          formación, buscamos seguir creciendo y consolidándonos como referentes
          en el atletismo colombiano.
        </p>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-2 m-8 ">
        {Prueba.map((item) => (
          <MoldeSobreNosotros item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
