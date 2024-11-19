import React from "react";
import {Inicio} from "./Inicio";
import Login from "./Login/Login";
import { Evento } from "./Eventos/Evento.jsx";
import Noticias from "./Noticias/Noticias.jsx";
import {Noticia} from "./Noticias/Noticia.jsx";
import Eventos from "./Eventos/Eventos.jsx";
import Register from "./Register/Register";
import EventosCrud from "./Eventos/EventosCrud.jsx";
import NoticiasCrud from "./Noticias/NoticiaCrud.jsx"
import DeportistasCrud from "./Deportistas/DeportistaCrud.jsx"
import { SobreNosotros } from "./SobreNosotros.jsx";
import {Admin} from "./Admin.jsx";
import {Carrito} from "./Carrito.jsx"
import EntrenadoresCrud from "./Entrenadores/EntrenadoresCrud.jsx";
import Productos from "./Productos/Productos.jsx";
import Producto from "./Productos/Producto.jsx";
import { Perfil } from "./Perfil/Perfil.jsx";

export const ConfiguracionRutas=[
  {
    path:'/',
    element:<Inicio/>,
  },
  {
    path:'/Login',
    element:<Login/>,
  },
  {
    path:'eventos/evento/:id',
    element:<Evento/>,
  },
  {
    path:'/Noticias',
    element:<Noticias/>,
  },
  {
    path:'/Noticias/Noticia/:id',
    element:<Noticia/>,
  },
  {
    path:'/Eventos',
    element:<Eventos/>,
  },
  {
    path:'/Register',
    element:<Register/>,
  },
  {
    path:'/Admin/Eventos',
    element:<EventosCrud/>,
  },
  {
    path:'/Admin/Noticias',
    element:<NoticiasCrud/>,
  },
  {
    path:'/Admin/Entrenadores',
    element:<EntrenadoresCrud/>,
  },
  {
    path:'/Admin/Deportistas',
    element:<DeportistasCrud/>,
  },
  {
    path:'/SobreNosotros',
    element:<SobreNosotros/>,
  },
  {
    path: '/Admin',
    element:<Admin/>,
  },
  {
    path:'/Carrito',
    element:<Carrito/>,
  },
  {
    path:'/Productos',
    element:<Productos/>,
  },
  {
    path:'/Productos/producto/:id',
    element:<Producto/>,
  },
  {
    path:'/Perfil',
    element:<Perfil/>,
  },
]

