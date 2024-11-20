import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { ModalForm } from "../../components/Modal";
import defaultImage from "../../assets/not_image.jpg";
import FormularioNoticia from "./FormularioNoticia";

const NoticiasCrud = () => {
  const API = "http://localhost:3000/noticias";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaNoticia, setNuevaNoticia] = useState({
    name: "",
    date: "",
    description: "",
    category: "",
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [noticiaEditada, setNoticiaEditada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertirFechaAFormatoDate = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const obtenerNoticias = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerNoticias();
  }, []);

  const editarNoticia = (noticiaId) => {
    const noticia = data.find((e) => e._id === noticiaId);
    console.log(noticia);
    if (noticia) {
      setNoticiaEditada(noticia);
      setNuevaNoticia({
        name: noticia.name,
        date: convertirFechaAFormatoDate(noticia.date),
        description: noticia.description,
        category: noticia.category,
        img: null,
      });

      setPreview(noticia.img[0] !== undefined ? noticia.img[0].secure_url  : null);
      setIsModalOpen(true);
    }
  };

  const actualizarNoticia = async () => {
    if (!noticiaEditada) return;

    try {
      const { name, date, description, category } = nuevaNoticia;

      const res = await axios.put(`${API}/${noticiaEditada._id}`, {
        name,
        date,
        description,
        category,
        place,
      });

      if (res.status === 200) {
        const noticiaActualizada = res.data;
        setData((prevData) =>
          prevData.map((noticia) =>
            noticia._id === noticiaActualizada._id ? noticiaActualizada : noticia
          )
        );
        limpiarFormulario();
        setNoticiaEditada(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar la Noticia: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar la Noticia:", error);
    }
  };

  const agregarNoticia = async () => {
    try {
      const formData = new FormData();
      formData.append("name", nuevaNoticia.name);
      formData.append("date", convertirFechaAFormatoDate(nuevaNoticia.date));
      formData.append("description", nuevaNoticia.description);
      formData.append("category", nuevaNoticia.category);
      if (nuevaNoticia.img) formData.append("img", nuevaNoticia.img);

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
      console.error("Error al agregar la noticia:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };

  const eliminarNoticia = async (noticiaID) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta noticia?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${noticiaID}`);

      if (res.status === 204) {
        await obtenerNoticias();
      } else {
        console.error(`Error al eliminar la noticia: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
    }
  };

  const limpiarFormulario = () => {
    setNuevaNoticia({
      name: "",
      date: "",
      description: "",
      category: "",
      place: "",
      img: null,
    });
    setPreview(null);
    setNoticiaEditada(null);
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.name },
    { name: "Fecha", selector: (row) => row.date },
    { name: "Categoria", selector: (row) => row.category },
    { name: "Descripción", selector: (row) => row.description },
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
          <Button className="p-2 m-2" onClick={() => eliminarNoticia(row._id)}>
            Eliminar
          </Button>
          <Button className="p-2 m-2" onClick={() => editarNoticia(row._id)}>
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
      <h2 className="text-center">Noticias</h2>
      <Button color="success" onPress={() => setIsModalOpen(true)}>
        Agregar Noticia
      </Button>
      <ModalForm
        isOpen={isModalOpen}
        closeOnBlur={false}
        title={noticiaEditada ? "Editar Noticia" : "Registro de Noticia"}
        formulario={
          <FormularioNoticia
            nuevaNoticia={nuevaNoticia}
            setNuevaNoticia={setNuevaNoticia}
            preview={preview}
            handleFileChange={(e) => {
              const file = e.target.files[0];
              setNuevaNoticia((prev) => ({ ...prev, img: file }));
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            noticiaEditada={noticiaEditada}
          />
        }
        direccion={noticiaEditada ? actualizarNoticia : agregarNoticia}
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

export default NoticiasCrud;
