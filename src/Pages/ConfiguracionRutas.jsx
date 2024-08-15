import React from "react";
import {Inicio} from "./Inicio";
import Login from "./Login/Login";
import {Registro} from "./Registro";
import { Producto } from "./Producto";
import Noticias from "./Noticias";
import Eventos from "./Eventos";
import Register from "./Register/Register";

export const ConfiguracionRutas=[
  {
    path:'/LigaAtletismo',
    element:<Inicio/>,
  },
  {
    path:'LigaAtletismo/Login',
    element:<Login/>,
  },
  {
    path:'LigaAtletismo/Registro',
    element:<Registro/>,
  },
  {
    path:'LigaAtletismo/:id',
    element:<Producto/>,
  },
  {
    path:'LigaAtletismo/Noticias',
    element:<Noticias/>,
  },
  {
    path:'LigaAtletismo/Eventos',
    element:<Eventos/>,
  },
  {
    path:'LigaAtletismo/register',
    element:<Register/>,
  },
 
 

]

