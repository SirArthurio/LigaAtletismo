import Inicio from "./Inicio";
import Productos from "./Productos";
import Carrito from "./Carrito";
import Login from "./Login"
import Registro from "./Registro"
import React from "react";

export {Inicio}
export const Login = React.lazy(()=> import('../Pages/Login'))
export const Registro = React.lazy(()=> import('../Pages/Registro'))
export const Carrito =React.lazy(()=> import('./Carrito'))
export const Productos = React.lazy(()=> import('./Productos'))