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
} from "@nextui-org/react";
import { obtenerEvento } from "../../API/Data";
import { useParams } from "react-router-dom";

const EventoAtleta = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [modalMode, setModalMode] = useState("ver");

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        if (id) {
          const data = await obtenerEvento(id);
          console.log("Datos del evento:", data);
          setEvento(data || {});
        }
      } catch (error) {
        console.error("Error al obtener el evento:", error);
        setEvento({});
      }
    };

    fetchEvento();
  }, [id]);

  const handleAgg = () => {
    setSelectedAthlete({ document: "" });
    setModalMode("añadir");
    onOpen(); 
  };
  const handleDelete = (athleteNumber) => {
    setEvento((prev) => ({
      ...prev,
      athletes: (prev.athletes || []).filter(
        (athlete) => athlete !== athleteNumber
      ),
    }));
  };

  const handleSave = () => {
    if (selectedAthlete?.document) {
      setEvento((prev) => ({
        ...prev,
        athletes: [...(prev.athletes || []), selectedAthlete.document], // Agregar el atleta
      }));
    }
    onClose(); // Cerrar el modal
  };

  if (!evento?.name) {
    return <p>Cargando datos del evento...</p>;
  }

  return (
    <Card className="max-w-[800px] mx-auto">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-2xl font-bold">Evento: {evento?.name}</h2>
        <Button size="sm" color="primary" onPress={() => handleAgg()}>
          Añadir Atleta
        </Button>
        <div className="flex justify-center space-x-2">
          <Image
            size="sm"
            src={
              evento?.img?.[0]?.secure_url || "https://via.placeholder.com/150"
            }
            alt={evento.name || "Producto"}
            className="w-full h-auto object-cover rounded-lg"
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
            {(evento?.athletes || []).map((athlete, index) => (
              <TableRow key={index}>
                <TableCell>{athlete}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => handleDelete(athlete)}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {modalMode === "ver" ? "Detalles del Atleta" : "Añadir Atleta"}
          </ModalHeader>
          <ModalBody>
            {modalMode === "añadir" && (
              <Input
                label="Documento del Atleta"
                value={selectedAthlete?.document || ""}
                onChange={(e) =>
                  setSelectedAthlete({
                    ...selectedAthlete,
                    document: e.target.value,
                  })
                }
              />
            )}
          </ModalBody>
          <ModalFooter>
            {modalMode === "añadir" && (
              <Button color="primary" onPress={handleSave}>
                Guardar
              </Button>
            )}
            <Button color="danger" variant="light" onPress={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default EventoAtleta;
