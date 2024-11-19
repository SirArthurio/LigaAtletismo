import { Suspense } from "react";
import "./App.css";
import { AppRutas } from "./Pages/Rutas";
import BarraNavegacion from "./components/Navbar";
import { spinner } from "@nextui-org/theme";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import UserContextProvider from "./Context/UserContext";

function AppContent() {
  const location = useLocation();
  if (location.pathname === "/Login" || location.pathname === "/Register") {
    return (
      <Suspense fallback={spinner}>
        <AppRutas />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={spinner}>
        <BarraNavegacion />
        <AppRutas />
      </Suspense>
    );
  }
}

function App() {
  return (
    <UserContextProvider>
      <Router basename="/LigaAtletismo">
        <AppContent />
      </Router>
    </UserContextProvider>
  );
}

export default App;
