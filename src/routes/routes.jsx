import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../vista/login/View/Login";
import MainMenu from "../vista/MainMenu/MainMenu";
import PaginaInicial from "../vista/PaginaInicial/paginaInicial";
import PersonaView from "../Personas/View/Persona";
import ProductoView from "../Productos/View/Producto";
import UsuarioView from "../Usuarios/View/Usuario";
import TicketView from "../Cortes/view/TicketView";
import Archivos from "../Files/View/Files";
import ReporteTicketView from "../Reportes/View/ReporteTicketView";
import ReporteTicketViewBar from "../Reportes/View/ReporteTicketViewBar";
import Layout from "../components/layouts/Layout";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/MainMenu" element={<MainMenu />} />
                <Route element={<Layout />}>
                    <Route path="/Empleados" element={<PersonaView />} />
                    <Route path="/Productos" element={<ProductoView />} />
                    <Route path="/Usuarios" element={<UsuarioView />} />
                    <Route path="/Ticket" element={<TicketView />} />
                    <Route path="/Archivos" element={<Archivos />} />
                    <Route path="/ReporteTicketView" element={<ReporteTicketView />} />
                    <Route path="/ReporteTicketViewBar" element={<ReporteTicketViewBar />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
