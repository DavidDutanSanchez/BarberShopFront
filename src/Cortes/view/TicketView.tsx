import { useEffect, useState } from "react";
import { Usuario } from "../../Usuarios/Model/Usuario";
import { getAllUsuarios } from "../../Usuarios/Controller/Usuario";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from "@mui/material";
import TicketModal from "./TicketModal";

const TicketView = () => {
  const [empleados, setEmpledaos] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Usuario>();




  const getAllEmpleados = async () => {
    try {
      const dataFetch = (await getAllUsuarios({ page: 1, pageSize: 100 })).data;
      setEmpledaos(dataFetch);
    } catch (error) {

    }

  }

  useEffect(() => {
    getAllEmpleados();
  }, []);

  return (
    <>
      <Box p={4}>
        <Typography variant="h5" mb={2}>Seleccione un empleado</Typography>
        {empleados.map(emp => (
          <Button
            key={emp.idUsuarios}
            variant="outlined"
            sx={{ m: 1 }}
            onClick={() => {
              setSelectedEmpleado(emp);
              setOpen(true);
            }}
          >
            {emp.usuario}
          </Button>
        ))}

        {selectedEmpleado && (
        <TicketModal
          open={open}
          onClose={() => setOpen(false)}
          usuarioSelecionado={selectedEmpleado}
        />
      )}
      </Box>
    </>
  );
};

export default TicketView;
