import React from "react";
import { Input } from "@nextui-org/react";
import {format} from "date-fns";

const FormularioEntrenador = ({
      entrenadorEditado,
      setEntrenadorEditado,
      preview,
      handleFileChange
  }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntrenadorEditado((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    console.log("Entrenador a editar")
    console.log(entrenadorEditado);
    return (
        <div>
            <h2 className="text-center">
                {"Editar Evento"}
            </h2>
            <form className="grid grid-cols-2 gap-4 p-2">
                <Input
                    isRequired
                    label="Nombre del Evento:"
                    value={entrenadorEditado.name}
                    className="max-w-xs"
                    name="name"
                    onChange={handleChange}
                />
                {/*<label>Fecha de Nacimiento</label>*/}
                {/*<input*/}
                {/*    className="border p-2"*/}
                {/*    type="date"*/}
                {/*    name="Birthdate"*/}
                {/*    value={format(new Date(deportistaEditado.birthdate), 'dd/MM/yyyy')}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                {/*<label>Imagen</label>*/}
                {/*<input*/}
                {/*    className="p-2"*/}
                {/*    type="file"*/}
                {/*    name="img"*/}
                {/*    onChange={handleFileChange}*/}
                {/*/>*/}

                {/*{preview && (*/}
                {/*    <div>*/}
                {/*        <h3>Vista previa de la imagen:</h3>*/}
                {/*        <img*/}
                {/*            src={preview}*/}
                {/*            alt="Preview"*/}
                {/*            style={{ width: "200px", height: "200px", objectFit: "cover" }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}


            </form>
        </div>
    );
};

export default React.memo(FormularioEntrenador);
