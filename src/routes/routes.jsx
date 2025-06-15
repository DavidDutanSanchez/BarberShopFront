import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../vista/login/login";
import MainMenu from "../vista/MainMenu/MainMenu";
import PaginaInicial from "../vista/PaginaInicial/paginaInicial";
import PersonaView from "../Personas/View/Persona"; 
import ProductoView from "../Productos/View/Producto"; 

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/MainMenu" element={<MainMenu />} />
                <Route path="/Empleados" element={<PersonaView />} />
                <Route path="/Productos" element={<ProductoView />} />
                
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
