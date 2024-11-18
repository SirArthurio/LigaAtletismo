import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export function ModalMensaje() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const sizes = ["xs"]

  return (
    <>
      {/* <div className="flex flex-wrap gap-3">*/}
      {/*  {sizes.map((size) => (*/}
      {/*    <Button key={size} onPress={() => handleOpen(size)}>Open {size}</Button>*/}
      {/*  ))}  */}
      {/*</div>*/}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={sizes}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ADVERTENCIA
              </ModalHeader>
              <ModalBody>
                <p>¿Está seguro que desea continuar?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export const ModalForm = ({
  isOpen,
  closeOnBlur,
  title,
  formulario,
  direccion,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={closeOnBlur}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
      <ModalContent>
        <ModalBody>{formulario}</ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              direccion(); // Ejecuta la función de guardado o edición
              // onClose(); // Cierra el modal
            }}
          >
            Guardar
          </Button>
          <Button onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
