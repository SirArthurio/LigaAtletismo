import { Route, Routes } from "react-router-dom";
import { ConfiguracionRutas } from "./ConfiguracionRutas";

export const AppRutas = () => {
    return (
        <Routes>
            {ConfiguracionRutas.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};
