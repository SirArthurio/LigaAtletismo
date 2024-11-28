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
import { obtenerEntrenador } from "../../API/Data";
import { useParams } from "react-router-dom";

const Entrenador = () => {
  const [entrenador, setEntrenador] = useState({ athletes: [] }); // Asegurar estructura inicial
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [modalMode, setModalMode] = useState("ver");

  const { id } = useParams(); // Extrae el ID desde la URL

  useEffect(() => {
    const fetchEntrenador = async () => {
      if (id) {
        const data = await obtenerEntrenador(id); // Pasa solo el ID
        setEntrenador(data);
      }
    };

    fetchEntrenador();
  }, [id]);

  const handleDelete = (athleteNumber) => {
    setEntrenador((prev) => ({
      ...prev,
      athletes: prev.athletes.filter((athlete) => athlete !== athleteNumber),
    }));
  };

  const handleView = (athleteNumber) => {
    setSelectedAthlete(athleteNumber);
    setModalMode("ver");
    onOpen();
  };

  const handleSave = () => {
    if (selectedAthlete !== null) {
      setEntrenador((prev) => ({
        ...prev,
        athletes: prev.athletes.map((athlete) =>
          athlete === selectedAthlete ? selectedAthlete : athlete
        ),
      }));
    }
    onClose();
  };

  if (!entrenador) {
    return <p>Cargando datos del entrenador...</p>;
  }

  return (
    <Card className="max-w-[800px] mx-auto">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-2xl font-bold">Entrenador: {entrenador?.name}</h2>
        <div className="flex justify-center space-x-2">
          <Image
            size="sm"
            src={
              entrenador?.img?.[0]?.secure_url ||
              "https://via.placeholder.com/150"
            }
            alt={entrenador.name || "Producto"}
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
            {entrenador.athletes.map((athlete, index) => (
              <TableRow key={index}>
                <TableCell>{athlete}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => handleView(athlete)}
                    >
                      Ver
                    </Button>
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
            {modalMode === "ver" ? "Detalles del atleta" : "Editar atleta"}
          </ModalHeader>
          <ModalBody>
            <Input
              label="Número del Atleta"
              value={selectedAthlete || ""}
              onChange={(e) => setSelectedAthlete(Number(e.target.value))}
              isReadOnly={modalMode === "ver"}
            />
          </ModalBody>
          <ModalFooter>
            {modalMode === "editar" && (
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

export default Entrenador;
