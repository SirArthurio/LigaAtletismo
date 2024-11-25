import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { obtenerProductos } from "../../API/Data";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/not_image.jpg";
import { Link } from "react-router-dom";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await obtenerProductos();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
          Nuestros Productos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <Card key={producto._id} className="max-w-sm">
              <CardBody className="p-0">
                <Image
                  src={
                    producto.img && producto.img.length > 0
                      ? producto.img[0].secure_url
                      : defaultImage
                  }
                  alt={producto.name}
                  className="w-full h-48 object-cover"
                />
              </CardBody>
              <CardFooter className="flex-col items-start">
                <h3 className="text-lg font-semibold">{producto.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {producto.description}
                </p>
                <div className="flex justify-between items-center w-full mt-4">
                  <span className="text-green-600 font-bold">
                    ${producto.price.toFixed(2)}
                  </span>
                  <Button color="success" size="sm">
                    <Link
                      to={`/Productos/producto/${producto._id}`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Ver Producto
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button color="success" size="lg" className="font-semibold">
            Ver todos los productos
          </Button>
        </div>
      </div>
    </section>
  );
}
