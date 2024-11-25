import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Download, FileText } from "lucide-react";
import { ObtenerFacturaUsuario } from "../../API/Data";

export default function Factura() {
  const [factura, setFactura] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFactura();
  }, []);

  const fetchFactura = async () => {
    try {
      const data = await ObtenerFacturaUsuario();
      if (data && data.length > 0) {
        setFactura(data);
      } else {
        setFactura([]);
      }
    } catch (error) {
      setError("Error al obtener las facturas.");
      console.error("Error al obtener las facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-4xl flex justify-center content-center">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Facturas</h2>
          <p className="text-sm text-default-500">
            descargar tus facturas 
          </p>
        </CardHeader>
        <CardBody className="px-3">
          {loading ? (
            <p>Cargando facturas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : factura.length === 0 ? (
            <p>No tienes facturas disponibles.</p>
          ) : (
            <Table aria-label="Tabla de facturas">
              <TableHeader>
                <TableColumn>FECHA</TableColumn>
                <TableColumn>MONTO TOTAL</TableColumn>

                <TableColumn>PRODUCTOS</TableColumn>
                <TableColumn>ACCIONES</TableColumn>
              </TableHeader>
              <TableBody>
                {factura.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {new Date(item.fecha).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.total}</TableCell>

                    <TableCell>
                      <ul>
                        {item.productos.map((producto) => (
                          <li key={producto._id}>
                            {producto.name} - ${producto.price} x{" "}
                            {producto.amount}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="light"
                        startContent={<Download size={16} />}
                      >
                        Descargar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
