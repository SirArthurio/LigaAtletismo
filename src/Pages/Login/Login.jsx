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
axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:3000", // Base del servidor
  withCredentials: true,
});

const Login = () => {
  const [form, setForm] = useState({
    user: null,
    password: null,
  });

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const manejadorIniciar = (e) => {
    e.preventDefault();

    if (!form.user || !form.password) {
      setError(true);
      setErrorMsg("Por favor, completa todos los campos.");
      return;
    }

    API.post("/login", form)
      .then((res) => {
        if (res.status === 200) {
          const user = new Usuario(
            res.data.user.document,
            res.data.user.name,
            res.data.user.user,
            res.data.user.levelUser
          );

          setUser({
            id: user.id,
            nombre: user.nombre,
            role: user.role,
          });

          console.log("Login successful!");
          navigate("/");
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

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h1 className="title">LICESAR</h1>
          </div>

          <div className="footerDiv flex">
            <span className="text">No tienes una cuenta?, Unetenos</span>
            <Link to="/register">
              <button className="btn">Crear Cuenta</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo img"></img>
          </div>

          <form action="" className="form grid" onSubmit={manejadorIniciar}>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon"></FaUserShield>
                <input
                  placeholder="Ingrese su usuario"
                  type="text"
                  id="username"
                  name="user"
                  onChange={manejadorState}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <GoShieldLock className="icon"></GoShieldLock>
                <input
                  placeholder="Ingrese su contraseña"
                  type="text"
                  id="password"
                  name="password"
                  onChange={manejadorState}
                />
              </div>
            </div>
            {/*<Link to='/LigaAtletismo'>*/}
            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon"></AiOutlineSwapRight>
            </button>
            {/*</Link>*/}

            <span className="footerDiv flex">
              Olvidaste tu contraseña? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
