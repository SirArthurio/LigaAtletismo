import React, {useEffect, useState} from "react";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import {ModalForm, ModalMensaje} from "../../components/Modal";
import axios from "axios";
import {format} from "date-fns";
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
} from "@nextui-org/react";
import { EditIcon } from "../../assets/TablasIconos/EditIcon";
import { DeleteIcon } from "../../assets/TablasIconos/DeleteIcon";
import FormularioDeportista from "./FormularioDeportista.jsx";

const columns = [
  { name: "Nombre"},
  { name: "Documento"},
  { name: "Categoría"},
  { name: "Fecha de nacimiento"},
  {name: "Acciones"}
];

const entrenadores = [
  { nombre: "luis enrique",
    id: 363636

  }
];

const tipoDeDocumento = [
  { nombre: "Cedula de Ciudadania" },
  { nombre: "Tarjeta de Identidad" },
];

const categoriasDeportes = [
  { nombre: "Lanzamiento" },
  { nombre: "Carrera" },
  { nombre: "Salto" },
];

const DeportistasCrud = () => {
  const API = "http://localhost:3000/atletas";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deportistaEditado, setDeportistaEditado] = useState({
    name: "",
    documentType: "",
    document: "",
    birthdate: "",
    sport:"",
    coach: "",
    user: "",
    password: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);
  const [deportistaAEditar, setDeportistaAEditar] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeportistaEditado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const convertirFechaAFormatoDate = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const agregarDeportista = async () => {
    try {
      const formData = new FormData();
      formData.append("name", deportistaEditado.name);
      formData.append("documentType", deportistaEditado.documentType);
      formData.append("document", deportistaEditado.document);
      formData.append("birthdate", convertirFechaAFormatoDate(deportistaEditado.birthdate));
      formData.append("sport", deportistaEditado.sport);
      formData.append("coach", parseInt(deportistaEditado.coach));
      formData.append("user", deportistaEditado.user);
      formData.append("password", deportistaEditado.password);

      if (deportistaEditado.img) formData.append("img", deportistaEditado.img);

      const res = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        const deportistas = await obtenerDeportistas();
        setData(deportistas);
        limpiarFormulario();
      }
    } catch (error) {
      console.error("Error al agregar el deportista:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };


  const eliminarDeportista = async (deportistaId) => {
    const confirmar = window.confirm(
        "¿Estás seguro de que quieres eliminar este deportista?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${deportistaId}`);

      if (res.status === 200) {
        const deportistas = await obtenerDeportistas();
        setData(deportistas);
      } else {
        console.error(`Error al eliminar el deportista: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar el deportista:", error);
    }
  };

  const actualizarDeportista = async () => {

    if (!deportistaEditado) return;

    try {
      const res = await axios.put(`${API}`, deportistaEditado)

      if (res.status === 200) {
        const deportistas = await obtenerDeportistas();
        setData(deportistas);
        limpiarFormulario();
        // setDeportistaEditado(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar el deportista: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar el deportista:", error);
    }
  };

  const obtenerDeportistas = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.error("Error al obtener los deportistas:", error);
    }
  }

  useEffect(() => {
    obtenerDeportistas().then((response) => {
      setData(response);
    });
  }, []);



  const limpiarFormulario = () => {
    setDeportistaEditado({
      name:"",
      documentType: "",
      document: "",
      birthdate: "",
      sport: "",
      coach: "",
      user: "",
      password: "",
      img: null,
    });
  };

  const TablaDeportista = () => {
    const renderCell = React.useCallback((item, columnKey) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "Documento":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">
                  {item.document}
                </p>
              </div>
          );
        case "Nombre":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">
                  {item.name}
                </p>
              </div>
          );
        case "Categoría":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">
                  {item.sport[0]}
                </p>
              </div>
          );
        case "Fecha de nacimiento":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">
                  {format(new Date(item.birthdate), 'yyyy/MM/dd')}
                </p>
              </div>
          );
        case "Acciones":
          return (
              <div className="relative flex items-center gap-2">
                <Tooltip color="danger" content="Edit user">
                  <Button onPress={ () => {
                    setDeportistaEditado(item);
                    setIsModalOpen(true)}}
                    className="text-lg text-danger cursor-pointer active:opacity-50">
                    <EditIcon/>
                  </Button>
                </Tooltip>


                <Tooltip color="danger" content="Delete user">
                  <button onClick={async() => await eliminarDeportista(item.document)}
                          className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon/>
                  </button>
                </Tooltip>
              </div>
          );
        default:
          return cellValue;
      }
    }, []);

    if (!Array.isArray(data) || data.length === 0) {
      return (
          <div/>
      )
    }
    return(
    <div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
              <TableColumn
                  key={column.name}
                  align="center"
              >
                {column.name}
              </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
              <TableRow key={item.document} align="center">
                {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalForm
          isOpen={isModalOpen}
          closeOnBlur={false}
          title={"Editar Deportista"}
          formulario={
            <FormularioDeportista
                deportistaEditado={deportistaEditado}
                setDeportistaEditado={setDeportistaEditado}
                preview={preview}
                handleFileChange={(e) => {
                  const file = e.target.files[0];
                  setDeportistaEditado((prev) => ({ ...prev, img: file }));
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
            />
          }
          direccion={actualizarDeportista}
          onClose={handleCloseModal}
      />


    </div>
    );
  }


  return (
      <div className="m-3 p-5 border-2 rounded-md">
        <section>
          <h2 className="text-center">Registro de Deportista</h2>
          <form className="grid grid-cols-2 p-2">
            <Input
                isRequired
                label="Nombre completo del deportista:"
                defaultValue=""
                className="max-w-xs p-2"
                name="name"
                value={deportistaEditado.name}
                onChange={handleChange}
            />
            <div className="flex space-x-4">
              <Select
                  label="Identificación"
                  placeholder="Tipo de documento"
                  name="documentType"
                  className="max-w-xs"
                  value={deportistaEditado.documentType}
                  onChange={handleChange}
              >
                {tipoDeDocumento.map((tipoDeDocumento, index) => (
                  <SelectItem key={tipoDeDocumento.nombre} value={tipoDeDocumento.nombre}>
                    {tipoDeDocumento.nombre}
                  </SelectItem>
              ))}
            </Select>
            <Input
                isRequired
                label="Documento de identidad:"
                defaultValue=""
                name="document"
                value={deportistaEditado.document}
                className="max-w-xs p-2"
                onChange={handleChange}
            />
          </div>
          <label className="p-2">Ingrese la fecha de nacimiento</label>
          <input
              name="birthdate"
              value={deportistaEditado.birthdate}
              className="border-1 p-2"
              type="date"
              onChange={handleChange}
          />
          <label className="p-2">Imagen del atleta</label>
          <input
              name="img"
              value={deportistaEditado.img}
              className="p-2"
              type="file"
              onChange={handleChange}
          />
          <Select
              label="Entrenador:"
              placeholder="¿Quién es tu entrenador?"
              name="coach"
              value={deportistaEditado.coach}
              className="max-w-xs"
              onChange={handleChange}
          >
            {entrenadores.map((entrenador, index) => (
                <SelectItem key={entrenador.id} value={entrenador.nombre}>
                  {entrenador.nombre}
                </SelectItem>
            ))}
          </Select>

          <Select
              label="Categoría:"
              placeholder="¿Cual es su Categoría?"
              name="sport"
              value={deportistaEditado.sport}
              className="max-w-xs"
              onChange={handleChange}
          >
            {categoriasDeportes.map((categoria, index) => (
                <SelectItem key={categoria.nombre} value={categoria.nombre}>
                  {categoria.nombre}
                </SelectItem>
            ))}
          </Select>
          <Input
              isRequired
              label="Ingrese su Usuario:"
              defaultValue=""
              name="user"
              value={deportistaEditado.user}
              className="max-w-xs p-2"
              onChange={handleChange}
          />
          <Input
              isRequired
              label="Ingrese su Contraseña:"
              defaultValue=""
              name="password"
              value={deportistaEditado.password}
              className="max-w-xs p-2"
              onChange={handleChange}
          />
          </form>
          <Button color="success" onPress={async () => await agregarDeportista()}>
            Agregar Deportista
          </Button>
      </section>
        <section className="m-3 p-5 border-2 rounded-md">
          <div className="p-4">
            {TablaDeportista()}
          </div>
        </section>
      </div>
  );
}

export default DeportistasCrud;