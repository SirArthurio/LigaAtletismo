import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Image, Tabs, Tab } from "@nextui-org/react";
import { Star, ShoppingCart, Truck } from "lucide-react";
import { obtenerProducto } from "../../API/Data";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Producto = () => {
  const { id } = useParams();
  const [producto, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  
  useEffect(() => {
    const fetchProducto = async () => {
      const data = await obtenerProducto(id);
      setProductos(data);
      if (data.img && data.img.length > 0) {
        setImagenSeleccionada(data.img[0].secure_url); 
      }
    };

    fetchProducto();
  }, [id]);

  const incrementar = () => setCantidad((prev) => prev + 1);
  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const agregarAlCarrito = async () => {
    try {
      const dataToSend = {
        product_id: id, 
        amount: cantidad, 
        size: producto.size[0], 
      };
      
      
      const response = await axios.post("http://localhost:3000/carrito/carrito", dataToSend, {
        withCredentials: true, 
      });

      if (response.status === 201) {
        Swal.fire({
            icon: "success",
            title: "¡Se AGREGO ESA VAINA COMPAE!",
            text: "se ha agregado el producto al carrito.",
            confirmButtonText: "Ok",
          })
      }
      
      
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito");
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={imagenSeleccionada}
              alt={producto.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-4">
              {producto.name}
            </h1>
            <p className="text-2xl font-bold text-green-600 mb-4">
              ${producto.price}
            </p>
            {producto.size?.map((item, index) => (
              <Button className="m-2 p-2" key={index}>
                <h3 className="text-xl font-semibold mb-2">{item}</h3>
              </Button>
            ))}

            <div className="flex items-center space-x-4 mb-6">
              <Button color="success" variant="flat" onPress={decrementar}>
                -
              </Button>
              <span className="text-xl font-semibold">{cantidad}</span>
              <Button color="success" variant="flat" onPress={incrementar}>
                +
              </Button>
            </div>
            <Button
              color="success"
              size="lg"
              className="w-full mb-4"
              startContent={<ShoppingCart className="w-5 h-5" />}
              onClick={agregarAlCarrito} 
            >
              Añadir al carrito
            </Button>
          </div>
        </div>
        <Tabs color="success" aria-label="Opciones del producto" className="mt-12">
          <Tab key="descripcion" title="Descripción">
            <Card>
              <CardBody>
                <h3 className="text-xl font-semibold mb-2">Descripción del producto</h3>
                <ul className="list-disc list-inside mt-4">
                  {producto.description}
                </ul>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="especificaciones" title="Especificaciones">
            <Card>
              <CardBody>
                <h3 className="text-xl font-semibold mb-2">Especificaciones técnicas</h3>
               
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default Producto;
