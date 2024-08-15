import "../Login/App.css";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { AiOutlineSwapRight } from "react-icons/ai";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import video from "../../assets/login/Liga.mp4";
import logo from "../../assets/login/liga.png";
import { Link } from "react-router-dom";
import { Usuario } from "../../Models/Usuario";
import { UserContext } from "../../Context/UserContext";
import swal from "sweetalert2";

const API = "http://localhost:5285/api/Usuarios/Iniciosesion";

const Register = () => {
  const [form, setForm] = useState({
    correo: null,
    contrasenia: null,
  });

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const manejadorIniciar = (e) => {
    e.preventDefault();
    axios
      .post(API, form)
      .then((res) => {
        if (res.status === 200) {
          const user = new Usuario(
            res.data.id,
            res.data.nombre,
            res.data.correoElectronico,
            res.data.contrasenia,
            res.data.role
          );
          setUser({
            id: user.id,
            nombre: user.nombre,
            role: user.role,
          });
          console.log("Login successful!");
          navigate("/inicio");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(true);
        setErrorMsg("Error occurred during login. Please try again.");
      });
  };

  const manejadorState = async (e) => {
    await setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };
  const alerta = () => {
    swal({
      title: "Registro Completado",
      icon: "Success",
      timer: "1000",
      buttons: ["Yes"],
    });
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h1 className="title"> Liga</h1>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo img"></img>
          </div>

          <form action="" className="form grid">
            <div className="inputDiv">
              <label htmlFor="username">Ingrese su usuario</label>
              <div className="input flex">
                <FaUserShield className="icon"></FaUserShield>
                <input
                  type="text"
                  id="Username"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="correo">Ingrese su Correo</label>
              <div className="input flex">
                <FaUserShield className="icon"></FaUserShield>
                <input
                  type="text"
                  id="correo"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Ingrese su Contraseña</label>
              <div className="input flex">
                <GoShieldLock className="icon"></GoShieldLock>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>
            <Link to="/LigaAtletismo">
              <button type="submit" className="btn flex" onClick={() => alerta}>
                <span>Registrarse</span>
                <AiOutlineSwapRight className="icon"></AiOutlineSwapRight>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
