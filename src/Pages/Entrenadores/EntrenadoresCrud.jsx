import React, {useEffect, useState} from "react";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import { ModalMensaje } from "../../components/Modal";
import TablaUser from "../../components/Tablas";
import axios from "axios";

const tipoDeDocumento = [
    { nombre: "Cedula de Ciudadania" },
    { nombre: "Tarjeta de Identidad" },
];

const EntrenadoresCrud = () => {
    const API = "http://localhost:3000/entrenadores";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [entrenadorEditado, setEntrenadorEditado] = useState({
        name: "",
        documentType: "",
        document: "",
        birthdate: "",
        user: "",
        password: "",
        img: null,
    });

    const [preview, setPreview] = useState(null);
    const [entrenadorAEditar, setEntrenadoresCrudAEditar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntrenadorEditado((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(entrenadorEditado);
    };

    const convertirFechaAFormatoDate = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, "0");
        const day = String(fecha.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const obtenerEntrenador = async () => {
        try {
            const res = await axios.get(API);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.error("Error al obtener los entrenadores:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerEntrenador();
    }, []);


    const editarEntrenador = (entrenadorId) => {
        const entrenador = data.find((e) => e._id === entrenadorId);
        console.log(entrenador);
        if (entrenador) {
            setEntrenadoresCrudAEditar(entrenador);
            setEntrenadorEditado({
                name: entrenador.name,
                documentType: entrenador.documentType,
                document: entrenador.document,
                birthdate: convertirFechaAFormatoDate(entrenador.birthdate),
                user: entrenador.user,
                password: entrenador.password,
                img: null,
            });

            setPreview(entrenador.img[0] !== undefined ? entrenador.img[0].secure_url  : null);
            setIsModalOpen(true);
        }
    };


    const actualizarEntrenador = async () => {
        if (!entrenadorEditado) return;

        try {
            const { name, documentType, document, birthdate, password, user} = nuevoEntrenador;

            const res = await axios.put(`${API}/${entrenadorEditado._id}`, {
                name,
                documentType,
                document,
                birthdate,
                user,
                password,
            });

            if (res.status === 200) {
                const entrenadorActualizado = res.data;
                setData((prevData) =>
                    prevData.map((entrenador) =>
                        entrenador._id === entrenadorActualizado._id ? entrenadorActualizado : entrenador
                    )
                );
                limpiarFormulario();
                setEntrenadoresCrudAEditar(null);
                setIsModalOpen(false);
            } else {
                console.error(`Error al actualizar el entrenador: ${res.status}`);
            }
        } catch (error) {
            console.error("Error al actualizar el entrenador:", error);
        }
    };

    const agregarEntrenador = async () => {
        try {
            const formData = new FormData();
            formData.append("name", entrenadorEditado.name);
            formData.append("documentType", entrenadorEditado.documentType);
            formData.append("document", entrenadorEditado.document);
            formData.append("birthdate", convertirFechaAFormatoDate(entrenadorEditado.birthdate));
            formData.append("user", entrenadorEditado.user);
            formData.append("password", entrenadorEditado.password);

            if (entrenadorEditado.img) formData.append("img", entrenadorEditado.img);

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
            console.error("Error al agregar el entrenador:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        limpiarFormulario();
    };


    const eliminarEntrenador = async (entrenadorId) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que quieres eliminar este entrenador?"
        );

        if (!confirmar) return;

        try {
            const res = await axios.delete(`${API}/${entrenadorId}`);

            if (res.status === 204) {
                await obtenerEntrenador();
            } else {
                console.error(`Error al eliminar el entrenador: ${res.status}`);
            }
        } catch (error) {
            console.error("Error al eliminar el entrenador:", error);
        }
    };

    const limpiarFormulario = () => {
        setEntrenadorEditado({
            name:"",
            documentType: "",
            document: "",
            birthdate: "",
            user: "",
            password: "",
            img: null,
        });
    };




    return (
        <div className="m-3 p-5 border-2 rounded-md">
            <section>
                <h2 className="text-center">Registro de Entrenadores</h2>
                <form className="grid grid-cols-2 p-2">
                    <Input
                        isRequired
                        label="Nombre completo del entrenador:"
                        defaultValue=""
                        className="max-w-xs p-2"
                        name="name"
                        value={entrenadorEditado.name}
                        onChange={handleChange}
                    />
                    <div className="flex space-x-4">
                        <Select
                            label="Identificación"
                            placeholder="Tipo de documento"
                            name="documentType"
                            className="max-w-xs"
                            value={entrenadorEditado.documentType}
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
                            value={entrenadorEditado.document}
                            className="max-w-xs p-2"
                            onChange={handleChange}
                        />
                    </div>
                    <label className="p-2">Ingrese la fecha de nacimiento</label>
                    <input
                        name="birthdate"
                        value={entrenadorEditado.birthdate}
                        className="border-1 p-2"
                        type="date"
                        onChange={handleChange}
                    />
                    <label className="p-2">Imagen del atleta</label>
                    <input
                        name="img"
                        value={entrenadorEditado.img}
                        className="p-2"
                        type="file"
                        onChange={handleChange}
                    />

                    <Input
                        isRequired
                        label="Ingrese su Usuario:"
                        defaultValue=""
                        name="user"
                        value={entrenadorEditado.user}
                        className="max-w-xs p-2"
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        label="Ingrese su Contraseña:"
                        defaultValue=""
                        name="password"
                        value={entrenadorEditado.password}
                        className="max-w-xs p-2"
                        onChange={handleChange}
                    />
                </form>
                <ModalMensaje/>{" "}
                <Button color="success" onPress={() => agregarEntrenador()}>
                    Agregar Entrenador
                </Button>
            </section>
            <section className="m-3 p-5 border-2 rounded-md">
                <TablaUser />
            </section>
        </div>
    );
}

export default EntrenadoresCrud;