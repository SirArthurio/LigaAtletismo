import React from "react";
import {Inicio} from "./Inicio";
import Login from "./Login/Login";
import { Evento } from "./Eventos/Evento.jsx";
import Noticias from "./Noticias/Noticias.jsx";
import Eventos from "./Eventos/Eventos.jsx";
import Register from "./Register/Register";
import EventosCrud from "./Eventos/EventosCrud.jsx";

export const ConfiguracionRutas=[
  {
    path:'/LigaAtletismo',
    element:<Inicio/>,
  },
  {
    path:'/Login',
    element:<Login/>,
  },
  {
    path:'Eventos/Evento/:id',
    element:<Evento/>,
  },
  {
    path:'/Noticias',
    element:<Noticias/>,
  },
  {
    path:'/Eventos',
    element:<Eventos/>,
  },
  {
    path:'/register',
    element:<Register/>,
  },
  {
    path:'LigaAtletismo/Eventos-crud',
    element:<EventosCrud/>,
  },
 
 

]

