import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Image,
  Avatar,
} from "@nextui-org/react";
import { obtenerEntrenador, EliminarAtletaEntrenador } from "../../API/Data";
import { useParams } from "react-router-dom";

const Entrenador = () => {
  const [entrenador, setEntrenador] = useState({ athletes: [] }); // Asegurar estructura inicial

  const { id } = useParams();

  useEffect(() => {
    const fetchEntrenador = async () => {
      if (id) {
        const data = await obtenerEntrenador(id);
        setEntrenador(data);
      }
    };

    fetchEntrenador();
  }, [id]);

  const handleDelete = async (document) => {
    await EliminarAtletaEntrenador(document);
    setEntrenador((prev) => ({
      ...prev,
      athletes: prev.athletes.filter((document) => athlete !== document),
    }));
  };

  return (
    <Card className="max-w-[800px] mx-auto">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-2xl font-bold">Entrenador: {entrenador?.name}</h2>
        <div className="flex justify-center space-x-2">
          <Avatar
            size="xl"
            src={
              entrenador?.img?.length > 0
                ? entrenador.img[0].secure_url
                : "https://via.placeholder.com/150"
            }
            alt={entrenador?.name || "entrenador"}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
      </CardHeader>

      <CardBody>
        <Table aria-label="Lista de atletas">
          <TableHeader>
            <TableColumn>Documento ATLETA</TableColumn>
            <TableColumn>ACCIONES</TableColumn>
          </TableHeader>
          <TableBody>
            {(entrenador?.athletes || []).map((athlete, index) => (
              <TableRow key={index}>
                <TableCell>{athlete}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => handleDelete(document)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Entrenador;
