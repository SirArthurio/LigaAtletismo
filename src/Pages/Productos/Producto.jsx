import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button, Image, Tabs, Tab } from "@nextui-org/react";
import { Star, ShoppingCart, Truck } from "lucide-react";
import { obtenerProducto } from "../../API/Data";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [cantidad, setCantidad] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const isLogin = user !== null;

  useEffect(() => {
    const fetchProducto = async () => {
      const data = await obtenerProducto(id);
      setProducto(data);

      if (data.img && data.img.length > 0) {
        setImagenSeleccionada(data.img[0].secure_url);
      }
    };

    fetchProducto();
  }, [id]);

  const incrementar = () => setCantidad((prev) => prev + 1);
  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const seleccionarTalla = (talla) => setTallaSeleccionada(talla);

  const agregarAlCarrito = async () => {
    try {
      if (!tallaSeleccionada) {
        Swal.fire({
          icon: "warning",
          title: "Selecciona una talla",
          text: "Por favor, selecciona una talla antes de añadir al carrito.",
          confirmButtonText: "Ok",
        });
        return;
      }
      if (producto.amount < cantidad) {
        Swal.fire({
          icon: "error",
          title: "Error al agregar al carrito",
          text: "No hay stock",
          confirmButtonText: "Ok",
        });
        return;
      }
      if (!isLogin) {
        Swal.fire({
          icon: "error",
          title: "Error al agregar al carrito",
          text: "Inicia sesion",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Login"); // Redirige al usuario al login
          }
        });
        return;
      }
      const dataToSend = {
        product_id: id,
        amount: cantidad,
        size: tallaSeleccionada,
      };

      const response = await axios.post(
        "http://localhost:3000/carritos/carrito",
        dataToSend,
        { withCredentials: true }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Producto agregado!",
          text: "El producto se ha añadido al carrito.",
          confirmButtonText: "Ok",
        });
      } else {
        throw new Error("Estado inesperado en la respuesta.");
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      Swal.fire({
        icon: "error",
        title: "Error al agregar al carrito",
        text: "Ocurrió un problema. Inténtalo de nuevo.",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={imagenSeleccionada || "/placeholder-image.png"}
              alt={producto.name || "Producto"}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-4">
              {producto.name || "Producto sin nombre"}
            </h1>
            <p className="text-2xl font-bold text-green-600 mb-4">
              ${producto.price || 0}
            </p>
            <div className="flex flex-wrap mb-4">
              {(Array.isArray(producto.size)
                ? producto.size[0]?.split(",").map((size) => size.trim())
                : []
              ).map((item, index) => (
                <Button
                  key={index}
                  className={`m-2 p-2 ${
                    tallaSeleccionada === item ? "bg-green-500 text-white" : ""
                  }`}
                  onPress={() => seleccionarTalla(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
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
        <Tabs
          color="success"
          aria-label="Opciones del producto"
          className="mt-12"
        >
          <Tab key="descripcion" title="Descripción">
            <Card>
              <CardBody>
                <h3 className="text-xl font-semibold mb-2">
                  Descripción del producto
                </h3>
                <p className="mt-4">
                  {producto.description || "Sin descripción"}
                </p>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="especificaciones" title="Especificaciones">
            <Card>
              <CardBody>
                <h3 className="text-xl font-semibold mb-2">
                  Especificaciones técnicas
                </h3>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default Producto;
