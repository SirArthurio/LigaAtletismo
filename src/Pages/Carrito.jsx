import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { obtenerCarrito } from "../API/Data";

export const Carrito = () => {
  const [carro, setCarro] = useState([]);

  useEffect(() => {
    const fetchCarrito = async () => {
      const data = await obtenerCarrito();
      setCarro(data);
    };

    fetchCarrito();
  }, []);

  const calcularTotal = () => {
    return carro.reduce((total, item) => total + (item.subTotal || 0), 0);
  };

  const eliminarProducto = (id) => {
    setCarro(carro.filter((producto) => producto._id !== id));
  };

  const handlePagar = () => {
    alert("Procesando pago de $" + calcularTotal());
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader className="flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" />
        <h4 className="text-lg font-bold">Carrito de Compras</h4>
      </CardHeader>
      <CardBody>
        {carro.length > 0 ? (
          carro.map((carro) => (
            <div
              key={carro._id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="font-semibold">{carro.name}</h3>
                <p className="text-sm text-gray-500">
                  {carro.amount }  x  { carro.price}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">${carro.subTotal}</span>
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={() => eliminarProducto(carro._id)}
                  aria-label={`Eliminar ${carro.name} del carrito`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Tu carrito está vacío.</div>
        )}
        <Divider className="my-4" />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold text-lg">${calcularTotal()}</span>
        </div>
      </CardBody>
      <CardFooter>
        <Button color="primary" fullWidth onPress={handlePagar}>
          Pagar ${calcularTotal()}
        </Button>
      </CardFooter>
    </Card>
  );
};
