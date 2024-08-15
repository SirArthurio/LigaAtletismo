import React, { useMemo } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "../assets/AcmeLogo.jsx";
import { SearchIcon } from "../assets/SearchIcon.jsx";
import { FiltroCategorias } from "./Filtro.jsx";
import { Link } from "react-router-dom";



const NavbarBrandComponent = () => (
  <NavbarBrand className="mr-4">
    <AcmeLogo />
    <Link color="foreground" to="/LigaAtletismo">
      <p className="hidden sm:block font-bold text-inherit">LICESAR</p>{" "}
    </Link>
  </NavbarBrand>
);

const NavbarContentStart = ({ categorias }) => (
  <NavbarContent className="hidden sm:flex gap-3">
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            radius="sm"
            variant="light"
          >
            Servicios
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[340px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {categorias.map((category, index) => (
          <DropdownItem key={index}>{category}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
    <NavbarItem isActive>
      <Link className="text-lime-400" aria-current="page" color="success">
        Resultados
      </Link>
    </NavbarItem>
    <NavbarItem>
      <Link color="foreground" href="#">
        Sobre Nosotros
      </Link>
    </NavbarItem>
    <NavbarItem>
      <Link color="foreground" href="#">
        Novedades
      </Link>
    </NavbarItem>
    <NavbarItem>
      <Link color="foreground" to="/Noticias">
        Noticias
      </Link>
    </NavbarItem>
    <NavbarItem>
      <Link color="foreground" to="/Eventos">
        Eventos
      </Link>
    </NavbarItem>
  </NavbarContent>
);
const ItsLogin=false
const NavbarContentEnd = () => {
  if (ItsLogin === true) {
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    );
  } else {
    return (
      <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link className='text-green-400	' to="LigaAtletismo/Login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="success" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
    )
  }
};



export default function BarraNavegacion() {
  const memoizedCategorias = useMemo(() => FiltroCategorias(), []);

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrandComponent />
        <NavbarContentStart categorias={memoizedCategorias} />
      </NavbarContent>
      <NavbarContentEnd />
    </Navbar>
  );
}
