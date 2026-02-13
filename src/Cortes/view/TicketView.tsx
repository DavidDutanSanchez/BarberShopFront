import { useEffect, useState } from "react";
import { Usuario } from "../../Usuarios/Model/Usuario";
import { getAllUsuarios } from "../../Usuarios/Controller/Usuario";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import TicketModal from "./TicketModal";
import { getAllFiles } from "../../Files/Controller/Files";
import { Files } from "../../Files/Model/Files";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from "react-router-dom";

const TicketView = () => {
  const [empleados, setEmpledaos] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Usuario>();
  const [imagenes, setImagenes] = useState<Files[]>([]);
  const [mostrarGestion, setMostrarGestion] = useState(false);
  const [usuariosVisibles, setUsuariosVisibles] = useState<string[]>([]);

  const getAllEmpleados = async () => {
    try {
      const dataFetch = (await getAllUsuarios({ page: 1, pageSize: 100 })).data;
      setEmpledaos(dataFetch);
      setUsuariosVisibles(dataFetch.map(e => e._persona_id));
    } catch (error) {}
  };

  const getAllPhotos = async () => {
    try {
      const dataFetch = (await getAllFiles({ page: 1, pageSize: 100 })).data;
      setImagenes(dataFetch);
    } catch (error) {}
  };

  useEffect(() => {
    getAllEmpleados();
    getAllPhotos();
  }, []);

  const getImageSrc = (userId: string) => {
    const file = imagenes.find(img => img._persona_id === userId);
    return file ? file.pathFiles : undefined;
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">Seleccione un empleado</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to="/MainMenu"
            color="secondary"
          >
            Volver al Menú
          </Button>
          <Button variant="contained" color="primary" onClick={() => setMostrarGestion(true)}>
            GESTIONAR
          </Button>
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {empleados
  .filter(emp =>
    usuariosVisibles.includes(emp._persona_id) &&
    emp.estado === true
  )
  .map(emp => {
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
                  width: 360,
                  height: 380,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textTransform: "none",
                  borderRadius: 3,
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
                      width: 250,
                      height: 250,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 250,
                      height: 250,
                      borderRadius: 2,
                      bgcolor: "grey.300",
                    }}
                  />
                )}
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}
                >
                  {emp.usuario}
                </Typography>
              </Button>
            );
          })}
      </Box>
      {selectedEmpleado && (
        <TicketModal
          open={open}
          onClose={() => setOpen(false)}
          usuarioSelecionado={selectedEmpleado}
        />
      )}
      <Dialog open={mostrarGestion} onClose={() => setMostrarGestion(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Gestionar empleados visibles</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexWrap="wrap" gap={3}>
            {empleados
  .filter(emp => emp.permisosUsuarios === "BARBERO" && emp.estado === true)
  .map(emp => {
              const imgSrc = getImageSrc(emp._persona_id);
              return (
                <Box
                  key={emp.idUsuarios}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  width="calc(50% - 16px)"
                >
                  <Avatar src={imgSrc} alt={emp.usuario} sx={{ width: 40, height: 40 }} />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={usuariosVisibles.includes(emp._persona_id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const id = emp._persona_id;
                          setUsuariosVisibles(prev =>
                            checked ? [...prev, id] : prev.filter(uid => uid !== id)
                          );
                        }}
                      />
                    }
                    label={emp.usuario}
                  />
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarGestion(false)} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketView;
