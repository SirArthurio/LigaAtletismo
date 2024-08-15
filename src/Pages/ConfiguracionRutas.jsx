import React from "react";
import {Inicio} from "./Inicio";
import Login from "./Login/Login";
import {Registro} from "./Registro";
import { Evento } from "./Evento";
import Noticias from "./Noticias";
import Eventos from "./Eventos";
import Register from "./Register/Register";

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
    path:'/Registro',
    element:<Registro/>,
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
 
 

]

