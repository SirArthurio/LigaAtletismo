import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AcmeLogo } from "../assets/AcmeLogo";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
  ];

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      // Asegúrate de que el menú se cierre después de un clic en el ítem
      const closeMenu = () => setIsMenuOpen(false);
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }
  }, [isMenuOpen]);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className="border-b">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <Link to="/LigaAtletismo">
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
              onClick={handleMenuItemClick} // Cierra el menú al hacer clic
            >
              {item.titulo}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
