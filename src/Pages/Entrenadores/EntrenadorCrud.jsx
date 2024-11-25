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
import FormularioEntrenador from "./FormularioEntrenador.jsx";

const columns = [
    { name: "Documento"},
    { name: "Nombre"},
    { name: "Numero de Atletas"},
    { name: "Fecha de nacimiento"},
    { name: "Acciones"}
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

const EntrenadorCrud = () => {
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
    const [entrenadorAEditar, setEntrenadorAEditar] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntrenadorEditado((prevState) => ({
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
                const entrenadores = await obtenerEntrenadores();
                setData(entrenadores);
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

            if (res.status === 200) {
                const entrenadores = await obtenerEntrenadores();
                setData(entrenadores);
            } else {
                console.error(`Error al eliminar el entrenador: ${res.status}`);
            }
        } catch (error) {
            console.error("Error al eliminar el entrenador:", error);
        }
    };

    const actualizarEntrenador = async () => {

        if (!entrenadorEditado) return;

        try {
            const res = await axios.put(`${API}`, entrenadorEditado)

            if (res.status === 200) {
                const entrenadores = await obtenerEntrenadores();
                setData(entrenadores);
                limpiarFormulario();
                setIsModalOpen(false);
            } else {
                console.error(`Error al actualizar el entrenador: ${res.status}`);
            }
        } catch (error) {
            console.error("Error al actualizar el entrenador:", error);
        }
    };

    const obtenerEntrenadores = async () => {
        try {
            const res = await axios.get(API);
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.error("Error al obtener los entrenadores:", error);
        }
    }

    useEffect(() => {
        obtenerEntrenadores().then((response) => {
            setData(response);
            console.log(response);
        });
    }, []);

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

    const TablaEntrenador = () => {
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
                case "Numero de Atletas":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{cellValue}</p>
                            <p className="text-bold text-sm capitalize text-default-400">
                                {item.documentType}
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
                                    setEntrenadorEditado({
                                        name: item.name,
                                        documentType: item.documentType,
                                        document: item.document,
                                        birthdate: item.birthdate,
                                        atletas: item.athletes,
                                        // img: item.img[0] ?? null
                                    });
                                    setIsModalOpen(true)}}
                                        className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <EditIcon/>
                                </Button>
                            </Tooltip>


                            <Tooltip color="danger" content="Delete user">
                                <button onClick={async() => await eliminarEntrenador(item.document)}
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
                    closeonblur={false}
                    title={"Editar Entrenador"}
                    formulario={
                        <FormularioEntrenador
                            entrenadorEditado={entrenadorEditado}
                            setEntrenadorEditado={setEntrenadorEditado}
                            preview={preview}
                            handleFileChange={(e) => {
                                const file = e.target.files[0];
                                setEntrenadorEditado((prev) => ({ ...prev, img: file }));
                                setPreview(file ? URL.createObjectURL(file) : null);
                            }}
                        />
                    }
                    direccion={actualizarEntrenador}
                    onClose={handleCloseModal}
                />


            </div>
        );
    }


    return (
        <div className="m-3 p-5 border-2 rounded-md">
            <section>
                <h2 className="text-center">Registro de Entrenador</h2>
                <form className="grid grid-cols-2 p-2">
                    <Input
                        isRequired
                        label="Nombre completo del Entrenador:"
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
                    <label className="p-2">Imagen del entrenador</label>
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
                <Button color="success" onPress={async () => await agregarEntrenador()}>
                    Agregar Entrenador
                </Button>
            </section>
            <section className="m-3 p-5 border-2 rounded-md">
                <div className="p-4">
                    {TablaEntrenador()}
                </div>
            </section>
        </div>
    );
}

export default EntrenadorCrud;