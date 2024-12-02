import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext.jsx";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "../assets/SearchIcon.jsx";
import { Link } from "react-router-dom";
import { AcmeLogo } from "../assets/AcmeLogo";
import { MdShoppingCart } from "react-icons/md";
import { cerrarSesion } from "../API/Data.jsx";

const menuItems = [
  {
    titulo: "Eventos",
    ref: "/Eventos",
  },
  {
    titulo: "Noticias",
    ref: "/Noticias",
  },
  {
    titulo: "Sobre Nosotros",
    ref: "/SobreNosotros",
  },
  {
    titulo: "Productos",
    ref: "/Productos",
  },
];

export default function Barra() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const [requisitoCumplido, setRequisitoCumplido] = useState(false);
  const isLogin = user !== null;

  useEffect(() => {
    if (
      user?.levelUser === "Administrador" ||
      user?.levelUser === "Entrenador"
    ) {
      setRequisitoCumplido(true);
    } else {
      setRequisitoCumplido(false);
    }
  }, [user?.levelUser]);
  console.log(user);
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = async () => {
    setUser(null);
    await cerrarSesion();
    console.log("Usuario deslogueado");
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      const closeMenu = () => setIsMenuOpen(false);
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }
  }, [isMenuOpen]);
  const Carrito = () => {
    return (
      <NavbarItem>
        <Link to="/Carrito">
          <MdShoppingCart />
        </Link>
      </NavbarItem>
    );
  };

  const NavbarContentEnd = () => {
    if (!isLogin) {
      return (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/Login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" to="/Register" variant="flat">
              Registrarse
            </Button>
          </NavbarItem>
        </NavbarContent>
      );
    } else {
      return (
        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Carrito />

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name || "Usuario"}
                size="sm"
                src={
                  user?.img?.[0]?.secure_url ||
                  "https://via.placeholder.com/150"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Logueado como:</p>
                <p className="font-semibold">{user.name}</p>
              </DropdownItem>
              <DropdownItem key="perfil">
                <Link to="/Perfil">Perfil</Link>
              </DropdownItem>
              {requisitoCumplido && (
                <DropdownItem key="admin">
                  <Link to="/Admin">Administrar</Link>
                </DropdownItem>
              )}
              {requisitoCumplido && user.levelUser === "Entrenador" && (
                <DropdownItem key="entrenador">
                  <Link to={`/entrenadores/${user._id}`}>Entrenador</Link>
                </DropdownItem>
              )}

              <DropdownItem key="Mis compras">
                <Link to="/facturas/usuario">Mis compras</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      );
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="border-b"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <Link to="/">
            <p className="font-bold text-inherit">LIATLECESAR</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" to={item.ref}>
              {item.titulo}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContentEnd />

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.titulo}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              to={item.ref}
              size="lg"
              onClick={handleMenuItemClick}
            >
              {item.titulo}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
