import React, { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { obtenerAtleta } from "../../API/Data";

const Deportista = (documento) => {
  const [deportista, setDeportista] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAtleta = async () => {
      const data = await obtenerAtleta(documento);
      setDeportista(data);
    };

    fetchAtleta();
  }, []);
  const handleEdit = () => {
    onOpen();
  };

  const handleSave = (editedDeportista) => {
    setDeportista(editedDeportista);
    onClose();
  };

  return (
    <Card className="max-w-[800px] mx-auto">
      <CardHeader className="flex gap-3">
        <Image
          alt={deportista.nombre}
          height={40}
          radius="sm"
          src={deportista.foto}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{deportista.nombre}</p>
          <p className="text-small text-default-500">{deportista.deporte}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
            <p>
              <strong>Edad:</strong> {deportista.edad} años
            </p>
            <p>
              <strong>Altura:</strong> {deportista.altura} cm
            </p>
            <p>
              <strong>Peso:</strong> {deportista.peso} kg
            </p>
            <p>
              <strong>Nacionalidad:</strong> {deportista.nacionalidad}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Información Deportiva
            </h3>
            <p>
              <strong>Categoría:</strong> {deportista.categoria}
            </p>
            <p>
              <strong>Equipo actual:</strong> {deportista.equipoActual}
            </p>
            <p>
              <strong>Años de experiencia:</strong> {deportista.experiencia}
            </p>
          </div>
        </div>
        <Divider className="my-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">Logros</h3>
          <div className="flex flex-wrap gap-2">
            {deportista.logros.map((logro, index) => (
              <Chip key={index} color="primary">
                {logro}
              </Chip>
            ))}
          </div>
        </div>
        <Divider className="my-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">Biografía</h3>
          <p>{deportista.biografia}</p>
        </div>
        <Button color="primary" onPress={handleEdit} className="mt-4">
          Editar Información
        </Button>
      </CardBody>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <EditarDeportista
              deportista={deportista}
              onSave={handleSave}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

const EditarDeportista = ({ deportista, onSave, onClose }) => {
  const [editedDeportista, setEditedDeportista] = useState(deportista);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDeportista((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogrosChange = (e) => {
    const logros = e.target.value.split(",").map((logro) => logro.trim());
    setEditedDeportista((prev) => ({
      ...prev,
      logros,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedDeportista);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader className="flex flex-col gap-1">
        Editar Información del Deportista
      </ModalHeader>
      <ModalBody>
        <Input
          label="Nombre"
          name="nombre"
          value={editedDeportista.nombre}
          onChange={handleChange}
        />
        <Input
          label="Deporte"
          name="deporte"
          value={editedDeportista.deporte}
          onChange={handleChange}
        />
        <Input
          label="Edad"
          name="edad"
          type="number"
          value={editedDeportista.edad}
          onChange={handleChange}
        />
        <Input
          label="Altura (cm)"
          name="altura"
          type="number"
          value={editedDeportista.altura}
          onChange={handleChange}
        />
        <Input
          label="Peso (kg)"
          name="peso"
          type="number"
          value={editedDeportista.peso}
          onChange={handleChange}
        />
        <Input
          label="Nacionalidad"
          name="nacionalidad"
          value={editedDeportista.nacionalidad}
          onChange={handleChange}
        />
        <Input
          label="Categoría"
          name="categoria"
          value={editedDeportista.categoria}
          onChange={handleChange}
        />
        <Input
          label="Equipo Actual"
          name="equipoActual"
          value={editedDeportista.equipoActual}
          onChange={handleChange}
        />
        <Input
          label="Años de Experiencia"
          name="experiencia"
          type="number"
          value={editedDeportista.experiencia}
          onChange={handleChange}
        />
        <Textarea
          label="Logros (separados por comas)"
          value={editedDeportista.logros.join(", ")}
          onChange={handleLogrosChange}
        />
        <Textarea
          label="Biografía"
          name="biografia"
          value={editedDeportista.biografia}
          onChange={handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Cancelar
        </Button>
        <Button color="primary" type="submit">
          Guardar Cambios
        </Button>
      </ModalFooter>
    </form>
  );
};

export default Deportista;
