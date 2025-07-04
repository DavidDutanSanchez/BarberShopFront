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
  Typography,
  Avatar
} from "@mui/material";
import TicketModal from "./TicketModal";
import { getAllFiles } from "../../Files/Controller/Files";
import { Files } from "../../Files/Model/Files";

const TicketView = () => {
  const [empleados, setEmpledaos] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Usuario>();
  const [imagenes, setImagenes] = useState<Files[]>([]);




  const getAllEmpleados = async () => {
    try {
      const dataFetch = (await getAllUsuarios({ page: 1, pageSize: 100 })).data;
      setEmpledaos(dataFetch);
    } catch (error) {

    }
  }

  const getAllPhotos = async () => {
    try {
      const dataFetch = (await getAllFiles({ page: 1, pageSize: 100 })).data;
      setImagenes(dataFetch);
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllEmpleados();
    getAllPhotos();
  }, []);

  const getImageSrc = (userId: string) => {
    const file = imagenes.find(img => img._persona_id === userId);
    if (!file) return undefined;
    return file.pathFiles;
  };

  return (
    <>
      <Box p={4}>
        <Typography variant="h5" mb={2}>Seleccione un empleado</Typography>
        {empleados.map(emp => {
          const imgSrc = getImageSrc(emp._persona_id);
          return (
            <Button
              key={emp.idUsuarios}
              variant="outlined"
              onClick={() => {
                setSelectedEmpleado(emp);
                setOpen(true);
              }}
              sx={{
                m: 1,
                p: 2,
                width: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textTransform: "none",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
            >
              {imgSrc ? (
                <Box
                  component="img"
                  src={imgSrc}
                  alt={emp.usuario}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    bgcolor: "grey.300",
                  }}
                />
              )}
              <Typography
                variant="caption"
                sx={{ mt: 1, textAlign: "center" }}
              >
                {emp.usuario}
              </Typography>
            </Button>
          );
        })}

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
