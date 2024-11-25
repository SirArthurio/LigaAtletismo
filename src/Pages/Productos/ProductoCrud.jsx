import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { ModalForm } from "../../components/Modal";
import defaultImage from "../../assets/not_image.jpg";
import FormularioProductos from "./FormularioProductos";

const ProductosCrud = () => {
  const API = "http://localhost:3000/productos";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    stock: 0,
    price: 0,
    size: [],
    description: "",
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [productoEditado, setProductoEditado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error al obtener las Productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const editarProducto = (productoID) => {
    const producto = data.find((e) => e._id === productoID);
    console.log(producto);
    if (producto) {
      setProductoEditado(producto);
      setNuevoProducto({
        name: producto.name,
        size: producto.size,
        stock: producto.stock,
        description: producto.description,
        price:producto.price,
        img: null,
      });

      setPreview(
        producto.img[0] !== undefined ? producto.img[0].secure_url : null
      );
      setIsModalOpen(true);
    }
  };

  const actualizarProducto = async () => {
    if (!productoEditado) return;

    try {
      const { name, size, description, stock, price } = nuevoProducto;

      const res = await axios.put(`${API}/${productoEditado._id}`, {
        name,
        size,
        description,
        stock,
        price,
      });

      if (res.status === 200) {
        const productoActualizado = res.data;
        setData((prevData) =>
          prevData.map((producto) =>
            producto._id === productoActualizado._id ? productoActualizado : producto
          )
        );
        limpiarFormulario();
        setProductoEditado(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar el producto: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  
  const agregarProducto = async () => {
    try {
      const formData = new FormData();
      formData.append("name", nuevoProducto.name);
      formData.append("size", nuevoProducto.size);
      formData.append("stock", nuevoProducto.stock);
      formData.append("price", nuevoProducto.price);
      formData.append("description", nuevoProducto.description);
      if (nuevoProducto.img) formData.append("img", nuevoProducto.img);

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
      console.error("Error al agregar la producto:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };

  const eliminarproducto = async (productoID) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta producto?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${productoID}`);

      if (res.status === 200) {
        await obtenerProductos();
      } else {
        console.error(`Error al eliminar la producto: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar la producto:", error);
    }
  };

  const limpiarFormulario = () => {
    setNuevoProducto({
      name: "",
      date: "",
      description: "",
      size: [],
      stock: 0,
      price: 0,
      img: null,
    });
    setPreview(null);
    setProductoEditado(null);
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.name },
    { name: "stock", selector: (row) => row.stock },
    { name: "size", selector: (row) => row.size },
    { name: "price", selector: (row) => row.price },
    { name: "Descripción", selector: (row) => row.description },
    {
      name: "Imagen",
      cell: (row) => {
        const imageUrl =
          row.img && row.img.length > 0 ? row.img[0].secure_url : defaultImage;
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
          <Button className="p-2 m-2" onClick={() => eliminarproducto(row._id)}>
            Eliminar
          </Button>
          <Button className="p-2 m-2" onClick={() => editarProducto(row._id)}>
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
      <h2 className="text-center">Productos</h2>
      <Button color="success" onPress={() => setIsModalOpen(true)}>
        Agregar producto
      </Button>
      <ModalForm
        isOpen={isModalOpen}
        closeOnBlur={false}
        title={productoEditado ? "Editar producto" : "Registro de producto"}
        formulario={
          <FormularioProductos
            nuevoProducto={nuevoProducto}
            setNuevoProducto={setNuevoProducto}
            preview={preview}
            handleFileChange={(e) => {
              const file = e.target.files[0];
              setNuevoProducto((prev) => ({ ...prev, img: file }));
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            productoEditado={productoEditado}
          />
        }
        direccion={productoEditado ? actualizarProducto : agregarProducto}
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

export default ProductosCrud;
