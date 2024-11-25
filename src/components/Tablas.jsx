import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { EditIcon } from "../assets/TablasIconos/EditIcon";
import { DeleteIcon } from "../assets/TablasIconos/DeleteIcon";
import { EyeIcon } from "../assets/TablasIconos/EyeIcon";
import { Prueba as datos } from "../API/DataPrueba";
import { ModalMensaje } from "./Modal";

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Rol", uid: "rol" },
  { name: "Tipo Evento", uid: "tipo" },
  { name: "Fecha", uid: "fecha" },
  { name: "Hora", uid: "hora" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TablaDato() {
  const renderCell = React.useCallback((dato, columnKey) => {
    const cellValue = dato[columnKey];

    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ radius: "lg", src: dato.img }}
            name={cellValue}
          ></User>
        );
      case "rol":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {datos.rol}
            </p>
          </div>
        );
      case "fecha":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {datos.fecha}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <button onClick={() => editarRuta(row.nombre)}>
              <Tooltip content="detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon onClick={<ModalMensaje />} />
                </span>
              </Tooltip>{" "}
            </button>

            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={datos}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
