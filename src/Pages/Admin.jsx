import React, {useContext, useState} from "react";
import { Carta2 } from "../components/Card";
import {UserContext} from "../Context/UserContext.jsx";


const items = [
    {
        id: "1",
        nombre: "Entrenadores",
        roles: ["Administrador", "Atleta"],
        img: "https://img.freepik.com/foto-gratis/entrenador-futbol-ensenando-sus-alumnos_23-2149708010.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723939200&semt=ais_hybrid"
    },
    {
        id: "2",
        nombre: "Deportistas",
        roles: ["Administrador", "Entrenador"],
        img: "https://img.freepik.com/fotos-premium/atleta-masculino-maraton-resistencia-fuerza-determinacion-cada-milla_1266186-1214.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724457600&semt=ais_hybrid"
    },
    {
        id: "3",
        nombre: "Productos",
        roles: ["Administrador", "Entrenador", "Atleta","Usuario"],
        img: "https://img.freepik.com/fotos-premium/modelo-camiseta-blanca-etiqueta-logotipo_639785-80412.jpg"
    },
    {
        id: "4",
        nombre: "Noticias",
        roles: ["Administrador"],
        img: "https://img.freepik.com/vector-gratis/gradiente-ultimas-noticias-fondo_23-2151173016.jpg"
    },
    {
        id: "5",
        nombre: "Eventos",
        roles: ["Administrador"],
        img: "https://st2.depositphotos.com/1017986/8500/i/450/depositphotos_85006170-stock-photo-happy-young-female-runner-winning.jpg"
    },
];


export function Admin() {
    const {user} = useContext(UserContext);
    return (
        <div>
            <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
                <h2 className="text-3xl text-center mt-2 pt-2">
                    {user.levelUser}
                </h2>
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
                {
                    items.map((item, index) => {
                        if(item.roles.includes(user.levelUser)) {
                            return (<Carta2 item={item} key={item.id} index={index} />)
                        }
                    })
                }
            </div>
        </div>
    );
}

