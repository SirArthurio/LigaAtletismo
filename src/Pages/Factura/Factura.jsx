import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Download } from "lucide-react";
import { ObtenerFacturaUsuario } from "../../API/Data";
import { PDFViewer,pdf} from "@react-pdf/renderer";
import { MyDocument } from "../../components/PDF";

export default function Factura() {
  const [factura, setFactura] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFactura, setSelectedFactura] = useState(null);

  useEffect(() => {
    fetchFactura();
  }, []);

  const fetchFactura = async () => {
    try {
      const data = await ObtenerFacturaUsuario();
      setFactura(data || []);
    } catch (error) {
      setError("Error al obtener las facturas.");
      console.error("Error al obtener las facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerPDF = async (factura) => {
    try {
      const blob = await pdf(<MyDocument items={factura} />).toBlob(); // Genera un Blob del documento PDF
      const url = URL.createObjectURL(blob); // Crea una URL temporal para el Blob
      window.open(url, '_blank'); // Abre el PDF en otra pestaña
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-4xl flex justify-center content-center">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Facturas</h2>
          <p className="text-sm text-default-500">Descargar tus facturas</p>
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
                    <TableCell>${item.total}</TableCell>
                    <TableCell>
                      <ul>
                        {item.productos.map((producto) => (
                          <li key={producto._id}>
                            {producto.name} - ${producto.price} x {producto.amount}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="light"
                        startContent={<Download size={16} />}
                        onClick={() => handleVerPDF(item)}
                      >
                        Ver PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {selectedFactura && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Factura</h3>
            <PDFViewer style={{ width: "100%", height: "500px" }}>
              <MyDocument items={selectedFactura} />
            </PDFViewer>
            <Button onClick={() => setSelectedFactura(null)} className="mt-4">
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
