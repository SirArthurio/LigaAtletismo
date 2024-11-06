import React, { Suspense,useState,useEffect } from "react";
import imagen1 from "../assets/CarruselHeader/1.jpg";
import imagen2 from "../assets/CarruselHeader/2.jpg";
import imagen3 from "../assets/CarruselHeader/3.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {obtenerEventos}   from "../API/Data";
import { Carta } from "./Card";
import { Spinner } from "@nextui-org/react";


const images = [
  {
    src: imagen1,
    evento: "https://www.google.com",
  },
  {
    src: imagen2,
    evento: "https://www.facebook.com",
  },
  {
    src: imagen3,
    evento: "https://www.example.com",
  },
];

const Carrusel = ({ item }) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={3000}
      centerMode={false}
      className="w-full"
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass="flex justify-center items-center h-1/4 w-1/4"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {item}
    </Carousel>
  );
};

export function CarruselEvento() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const data = await obtenerEventos();
      setEventos(data);
    };

    fetchEventos();
  }, []);

  return (
    <Suspense fallback={<Spinner size="xl" />}>
      <Carrusel item={eventos.map((item) => (
        <Carta item={item} key={item.id} index={item.id} />
      ))} />
    </Suspense>
  );
}

export function CarruselImagenes() {
  const renderImage = (image) => (
    <div
      key={image.src}
      onClick={() => (window.location.href = image.evento)}
      style={{ cursor: "pointer" }}
    >
      <img src={image.src} alt="Carrusel" style={{ width: "100%", height: "auto" }} />
    </div>
  );

  return (
    <Suspense fallback={<Spinner size="xl" />}>
      <Carrusel item={images.map(renderImage)} />
    </Suspense>
  );
}
