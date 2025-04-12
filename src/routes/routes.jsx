import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../vista/login/login";
import MainMenu from "../vista/MainMenu/MainMenu";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/Login" element={<Login />} />

                <Route path="/MainMenu" element={<MainMenu />} />

                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
        </Router>
    );
};

export default AppRouter;