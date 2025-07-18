import { useMemo, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import Person from "@mui/icons-material/Person";
import BarChart from "@mui/icons-material/BarChart";
import Logout from "@mui/icons-material/Logout";
import WebIcon from '@mui/icons-material/Web';
import ContentCut from "@mui/icons-material/ContentCut";
import Inventory from "@mui/icons-material/Inventory";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const SideBarMenu = () => {
  const [collapsed, setCollapsed] = useState(true)

  const extraRoutes = [
    { name: "Registro de Personas", route: "/Empleados", icon: <Person />, roles: ["ADMINISTRADOR"] },
    { name: "Productos", route: "/Productos", icon: <Inventory />, roles: ["ADMINISTRADOR"] },
    { name: "Gestion Usuarios", route: "/Usuarios", icon: <ManageAccountsIcon />, roles: ["ADMINISTRADOR"] },
    { name: "Cortes", route: "/Ticket", icon: <ContentCut />, roles: ["ADMINISTRADOR", "BARBERO"] },
    { name: "Archivos", route: "/Archivos", icon: <InsertDriveFileIcon />, roles: ["ADMINISTRADOR"] },
    { name: "Reportes", route: "/ReporteTicketView", icon: <BarChart />, roles: ["ADMINISTRADOR"] },
    { name: "Reporte-Bar", route: "/ReporteTicketViewBar", icon: <BarChart />, roles: ["BARBERO"] },
    { name: "Gestion Pagina", route: "/Pagina", icon: <WebIcon  />, roles: ["ADMINISTRADOR"] },
    { name: "Salir", route: "/Login", icon: <Logout />, roles: ["ADMINISTRADOR", "BARBERO"] },
  ]

  const role = useMemo(() => {
    return (localStorage.getItem("rol") || "").toUpperCase();
  }, []);

  const routes = useMemo(() => {
    return extraRoutes.filter(r => r.roles.includes(role));
  }, [role]);

  return (
    <div style={{ height: '100%' }}>
      <Sidebar
        collapsed={collapsed}
        onMouseOver={() => setCollapsed(false)}
        onMouseOut={() => setCollapsed(true)}
        collapsedWidth="100%"
        toggled
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
          <Menu>
            {routes.map((route) => (
              <MenuItem
                key={route.name}
                component={<Link to={route.route} />}
                icon={
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {route.icon}
                  </div>
                }
              >
                {!collapsed && (
                  <span style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                    {route.name}
                  </span>
                )}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Sidebar >
    </div >
  )
}

export default SideBarMenu
