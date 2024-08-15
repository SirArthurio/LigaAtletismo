import React from "react";
import imagen1 from "../assets/CarruselHeader/1.jpg";
import imagen2 from "../assets/CarruselHeader/2.jpg";
import imagen3 from "../assets/CarruselHeader/3.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Prueba } from "../API/DataPrueba";
import Carta from "./Card";
import "react-image-gallery/styles/css/image-gallery.css";
import { Suspense } from 'react';
import { spinner } from '@nextui-org/theme';


//Mapeo de datos con su respectiva carta
const Eventos = Prueba.map((item, index) => (
  <Carta item={item} key={item.id} index={index} />
));

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
      autoPlaySpeed={2000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      sliderClass=""
      slidesToSlide={2}
      swipeable
    >
      {item}
    </Carousel>
  );
};

export function CarruselEvento() {
  return <Carrusel item={Eventos} />;
}
export function CarruselImagenes() {
  const renderImage = (image) => (
    <div
      key={image.src}
      onClick={() => (window.location.href = image.evento)}
      style={{ cursor: "pointer" }}
    >
      <img src={image.src} />
    </div>
  );

  return (
    <Suspense fallback={spinner}>
      <Carrusel item={images.map(renderImage)} />
    </Suspense>
  );
}
