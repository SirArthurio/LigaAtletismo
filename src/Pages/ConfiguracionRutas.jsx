import React from "react";
import {Inicio} from "./Inicio";
import {Productos} from "./Productos";
import {Carrito} from "./Carrito";
import Login from "./Login/Login";
import {Registro} from "./Registro";
import { Producto } from "./Producto";
import Noticias from "./Noticias";
import Eventos from "./Eventos";
import Register from "./Register/Register";

export const ConfiguracionRutas=[
  {
    path:'/',
    element:<Inicio/>,
  },
  {
    path:'/Productos',
    element:<Productos/>,
  },
  {
    path:'/Carrito',
    element:<Carrito/>,
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
    path:'/Productos/Producto/:id',
    element:<Producto/>,
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

