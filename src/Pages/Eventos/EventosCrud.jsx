import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { ModalForm } from "../../components/Modal";
import defaultImage from "../../assets/not_image.jpg";
import FormularioEvento from "./FormaularioEvento";

const EventosCrud = () => {
  const API = "http://localhost:3000/eventos";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoEvento, setNuevoEvento] = useState({
    name: "",
    date: "",
    description: "",
    category: "",
    place: "",
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [eventoEditado, setEventoEditado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertirFechaAFormatoDate = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const obtenerEventos = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEventos();
  }, []);

  const editarEvento = (eventoId) => {
    const evento = data.find((e) => e._id === eventoId);
    console.log(evento);
    if (evento) {
      setEventoEditado(evento);
      setNuevoEvento({
        name: evento.name,
        date: convertirFechaAFormatoDate(evento.date),
        description: evento.description,
        category: evento.category,
        place: evento.place,
        img: null,
      });

      setPreview(evento.img[0] !== undefined ? evento.img[0].secure_url  : null);
      setIsModalOpen(true);
    }
  };

  const actualizarEvento = async () => {
    if (!eventoEditado) return;

    try {
      const { name, date, description, category, place } = nuevoEvento;

      const res = await axios.put(`${API}/${eventoEditado._id}`, {
        name,
        date,
        description,
        category,
        place,
      });

      if (res.status === 200) {
        const eventoActualizado = res.data;
        setData((prevData) =>
          prevData.map((evento) =>
            evento._id === eventoActualizado._id ? eventoActualizado : evento
          )
        );
        limpiarFormulario();
        setEventoEditado(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar el evento: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  };

  const agregarEvento = async () => {
    try {
      const formData = new FormData();
      formData.append("name", nuevoEvento.name);
      formData.append("date", convertirFechaAFormatoDate(nuevoEvento.date));
      formData.append("description", nuevoEvento.description);
      formData.append("category", nuevoEvento.category);
      formData.append("place", nuevoEvento.place);
      if (nuevoEvento.img) formData.append("img", nuevoEvento.img);

      const res = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setData((prevData) => [...prevData, res.data]);
        limpiarFormulario();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error al agregar el evento:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };

  const eliminarEvento = async (eventoId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este evento?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${eventoId}`);

      if (res.status === 200) {
        await obtenerEventos();
      } else {
        console.error(`Error al eliminar el evento: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const limpiarFormulario = () => {
    setNuevoEvento({
      name: "",
      date: "",
      description: "",
      category: "",
      place: "",
      img: null,
    });
    setPreview(null);
    setEventoEditado(null);
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.name },
    { name: "Fecha", selector: (row) => row.date },
    { name: "Categoria", selector: (row) => row.category },
    { name: "Descripción", selector: (row) => row.description },
    { name: "Lugar", selector: (row) => row.place },
    {
      name: "Imagen",
      cell: (row) => {
        const imageUrl =
          row.img && row.img.length > 0
            ? row.img[0].secure_url
            : defaultImage;
        console.log(row.img);
        console.log(imageUrl);
        return (
          <img
            src={imageUrl}
            alt={row.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button className="p-2 m-2" onClick={() => eliminarEvento(row._id)}>
            Eliminar
          </Button>
          <Button className="p-2 m-2" onClick={() => editarEvento(row._id)}>
            Editar
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="z-40 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">Eventos</h2>
      <Button color="success" onPress={() => setIsModalOpen(true)}>
        Agregar Evento
      </Button>
      <ModalForm
        isOpen={isModalOpen}
        closeOnBlur={false}
        title={eventoEditado ? "Editar Evento" : "Registro de Evento"}
        formulario={
          <FormularioEvento
            nuevoEvento={nuevoEvento}
            setNuevoEvento={setNuevoEvento}
            preview={preview}
            handleFileChange={(e) => {
              const file = e.target.files[0];
              setNuevoEvento((prev) => ({ ...prev, img: file }));
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            eventoEditado={eventoEditado}
          />
        }
        direccion={eventoEditado ? actualizarEvento : agregarEvento}
        onClose={handleCloseModal}
      />

      <div className="border mt-4">
        <DataTable
          key={`datatable-${data.length}-${Date.now()}`}
          columns={columns}
          data={data}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default EventosCrud;
