// src/components/Layout.jsx
import { useEffect, Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,

} from "@mui/material";
import Person from "@mui/icons-material/Person"
import Settings from "@mui/icons-material/Settings"
import BarChart from "@mui/icons-material/BarChart"
import Logout from "@mui/icons-material/Logout"
import ContentCut from "@mui/icons-material/ContentCut"
import Inventory from "@mui/icons-material/Inventory"
import Web from "@mui/icons-material/Web";



//este path es para cargar la pagina prinicpal
//const Settings = lazy(() => import("../pages/Settings"));

export default function Layout() {
  useEffect(() => {
    //este es para que renderize desde un incio en esta pagina.
    //import("../pages/Settings");
  }, []);

  const menuItems = [
    { label: "Registro de Personas", to: "/Empleados", icon: <Person /> },
    { label: "Gestion Usuarios", to: "/Usuarios", icon: <Person /> },
    { label: "Reportes", to: "/Reportes", icon: <BarChart /> },
    { label: "Cortes", to: "/Cortes", icon: <ContentCut /> },
    { label: "Productos", to: "/Productos", icon: <Inventory /> },
    { label: "Pagina", to: "/Pagina", icon: <Web /> },
    { label: "Configuracion", to: "/Configuracion", icon: <Settings /> },
    { label: "Salir", to: "/Login", icon: <Logout /> },

  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map(({ label, to, icon }) => (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              sx={{
                "&.active .MuiListItemIcon-root, &.active .MuiListItemText-root": {
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
