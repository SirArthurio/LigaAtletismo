import React, {useEffect, useState} from "react";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import { ModalMensaje } from "../../components/Modal";
import TablaUser from "../../components/Tablas";
import axios from "axios";

const entrenadores = [
  { nombre: "Alvaro",
    id: 1234
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
  const [atletas, setAtletas] = useState([]);
  // const [loading, setLoading] = useState(true);
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
  const [deportistaAEditar, setDeportistaAEditar] = useState(null);
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
      setAtletas(response);
    });
  }, []);


  const editarDeportista = (deportistaId) => {
    const deportista = data.find((e) => e._id === deportistaId);
    console.log(deportista);
    if (deportista) {
      setDeportistaAEditar(deportista);
      setDeportistaEditado({
        name: deportista.name,
        documentType: deportista.documentType,
        document: deportista.document,
        birthdate: convertirFechaAFormatoDate(deportista.birthdate),
        sport: deportista.sport,
        coach: deportista.coach,
        user: deportista.user,
        password: deportista.password,
        img: null,
      });

      setPreview(deportista.img[0] !== undefined ? deportista.img[0].secure_url  : null);
      setIsModalOpen(true);
    }
  };


  const actualizarDeportista = async () => {
    if (!deportistaEditado) return;

    try {
      const { name, documentType, document, birthdate, password, sport, coach, user} = nuevoDeportista;

      const res = await axios.put(`${API}/${deportistaEditado._id}`, {
        name,
        documentType,
        document,
        birthdate,
        sport,
        coach,
        user,
        password,
      });

      if (res.status === 200) {
        const deportistaActualizado = res.data;
        setData((prevData) =>
            prevData.map((deportista) =>
                deportista._id === deportistaActualizado._id ? deportistaActualizado : deportista
            )
        );
        limpiarFormulario();
        setDeportistaAEditar(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar el deportista: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar el deportista:", error);
    }
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
        setData((prevData) => [...prevData, res.data]);
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

      if (res.status === 204) {
        await obtenerDeportistas();
      } else {
        console.error(`Error al eliminar el deportista: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar el deportista:", error);
    }
  };

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
        <ModalMensaje/>{" "}
        <Button color="success" onPress={() => agregarDeportista()}>
          Agregar Deportista
        </Button>
      </section>
      <section className="m-3 p-5 border-2 rounded-md">
        <TablaUser />
      </section>
    </div>
  );
}

export default DeportistasCrud;