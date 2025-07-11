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
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import BarChart from "@mui/icons-material/BarChart";
import Logout from "@mui/icons-material/Logout";
import ContentCut from "@mui/icons-material/ContentCut";
import Inventory from "@mui/icons-material/Inventory";
import Web from "@mui/icons-material/Web";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const rol = localStorage.getItem("rol"); // ADMINISTRADOR o BARBERO


// este path es para cargar la pagina prinicpal
// const Settings = lazy(() => import("../pages/Settings"));

export default function Layout() {
  useEffect(() => {
    // este es para que renderize desde un incio en esta pagina.
    // import("../pages/Settings");
  }, []);

  // const menuItems = [
  //   { label: "Registro de Personas", to: "/Empleados", icon: <Person /> },
  //   { label: "Gestion Usuarios", to: "/Usuarios", icon: <ManageAccountsIcon /> },
  //   { label: "Archivos", to: "/Archivos", icon: <InsertDriveFileIcon /> },
  //   { label: "Reportes", to: "/ReporteTicketView", icon: <BarChart /> },
  //   { label: "Cortes", to: "/Ticket", icon: <ContentCut /> },
  //   { label: "Productos", to: "/Productos", icon: <Inventory /> },
  //   { label: "Pagina", to: "/Pagina", icon: <Web /> },
  //   { label: "Salir", to: "/Login", icon: <Logout /> },
  // ];

  const menuItems = [
    { label: "Registro de Personas", ruta: "/personas", icono: "👤", roles: ["ADMINISTRADOR"] },
    { label: "Productos", ruta: "/productos", icono: "📦", roles: ["ADMINISTRADOR"] },
    { label: "Gestión Usuarios", ruta: "/usuarios", icono: "⚙️", roles: ["ADMINISTRADOR"] },
    { label: "Cortes", ruta: "/cortes", icono: "✂️", roles: ["ADMINISTRADOR", "BARBERO"] },
    { label: "Archivos", ruta: "/archivos", icono: "📄", roles: ["ADMINISTRADOR"] },
    { label: "Reportes", ruta: "/reportes", icono: "📊", roles: ["ADMINISTRADOR"] },
    { label: "Salir", ruta: "/logout", icono: "↩️", roles: ["ADMINISTRADOR", "BARBERO"] },
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
          {/* {menuItems.map(({ label, to, icon }) => (
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
        ))} */}
          {menuItems
            .filter(item => item.roles.includes(rol ?? ""))
            .map((item, index) => (
              <NavLink key={index} to={item.ruta} className="menu-item">
                <span style={{ marginRight: "10px" }}>{item.icono}</span>
                {item.label}
              </NavLink>
            ))}

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          bgcolor: "#fff",
        }}
      >
        <Box
          component="img"
          src="/assets/FONDOInicial.jpg"
          alt="Logo Pintado"
          sx={{
            width: "800px",
            height: "auto",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              animation: "pulse 1s infinite",
            },
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.05)",
              },
              "100%": {
                transform: "scale(1)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );

}
