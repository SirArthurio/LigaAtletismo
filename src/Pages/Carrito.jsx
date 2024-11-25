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
import { CrearFactura, obtenerCarrito, eliminarDelCarrito } from "../API/Data";
import Swal from "sweetalert2";

export const Carrito = () => {
  const [carro, setCarro] = useState([]);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      const data = await obtenerCarrito();
      setCarro(data);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  const calcularTotal = () => {
    return carro.reduce((total, item) => total + (item.subTotal || 0), 0);
  };

  const eliminarProducto = async (_id) => {
    try {
      await eliminarDelCarrito(_id);
      await fetchCarrito();
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto se ha eliminado del carrito.",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        text: "No se pudo eliminar el producto del carrito. Intenta nuevamente.",
        confirmButtonText: "Ok",
      });
    }
  };

  const handlePagar = async () => {
    Swal.fire({
      title: "Confirmación de Pago",
      text: `Estás a punto de procesar el pago de $${calcularTotal()}. ¿Deseas continuar?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CrearFactura();
          if (response.status === 201) {
            await fetchCarrito();
            Swal.fire(
              "Pago realizado",
              "Tu pago se ha procesado exitosamente.",
              "success"
            );
          } else {
            Swal.fire(
              "Error en el Pago",
              "Ocurrió un error al procesar tu pago. Por favor, verifica tu carrito.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error al procesar el pago:", error);
          Swal.fire(
            "Error en el Pago",
            "Ocurrió un problema al procesar tu pago. Intenta nuevamente.",
            "error"
          );
        }
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader className="flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" />
        <h4 className="text-lg font-bold">Carrito de Compras</h4>
      </CardHeader>
      <CardBody>
        {carro.length > 0 ? (
          carro.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="font-semibold">{item.Producto.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.amount} x ${item.Producto.price}
                </p>
                <p className="text-sm text-gray-500">
                  Talla:{" "}
                  {item.size &&
                  (Array.isArray(item.size)
                    ? item.size
                    : item.size.split(",").map((size) => size.trim())
                  ).length > 0
                    ? (Array.isArray(item.size)
                        ? item.size
                        : item.size.split(",").map((size) => size.trim())
                      ).map((size, index) => (
                        <span key={index}>
                          {size}
                          {index <
                          (Array.isArray(item.size)
                            ? item.size
                            : item.size.split(",").map((size) => size.trim())
                          ).length -
                            1
                            ? ", "
                            : ""}
                        </span>
                      ))
                    : "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">${item.subTotal}</span>
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={() => eliminarProducto(item._id)}
                  aria-label={`Eliminar ${item.Producto.name} del carrito`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            Tu carrito está vacío.
          </div>
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
