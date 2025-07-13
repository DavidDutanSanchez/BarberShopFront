import { useEffect, useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { ServicioDto } from '../Model/Servicio'
import { deleteService, getAllService } from '../Controller/ServiciosService'
import CreateServiciosModal from './CreateService'

type ServiciosModalProps = {
  open: boolean
  onClose: () => void
  onAdd: (servicio: ServicioDto) => void
}
const ServiciosModal = ({ open, onClose, onAdd }: ServiciosModalProps) => {
  const [servicios, setservicios] = useState<ServicioDto[]>([])
  const [openServicios, setOpenServicios] = useState(false)

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const fetchServices = async () => {
    try {
      const dataFetch = (await getAllService({ page: 1, pageSize: 100 })).data;
      setservicios(dataFetch);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error as string || 'Error al cargar datos',
        severity: 'error',
      });
    }
  }

  useEffect(() => {
    fetchServices()
  }, []);

  const deleteServicio = async (servicioId: string) => {
    try {
      await deleteService(servicioId)
      await fetchServices();
      setSnackbar({
        open: true,
        message: 'Servicio eliminado correctamente',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error as string || 'Error al eliminar el servicio',
        severity: 'error',
      });
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar(s => ({ ...s, open: false }));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Eliga un servicio</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" onClick={() => setOpenServicios(true)}>
              Crear Servicio
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Servicio</TableCell>
                  <TableCell>Valor $</TableCell>
                  <TableCell>Comision %</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {servicios.map(row => (
    <TableRow
      key={row.idServicio}
      onClick={() => onAdd(row)}
      sx={{
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#f0f0f0' // tono más oscuro al pasar el mouse
        },
        '&:active': {
          backgroundColor: '#e0e0e0' // tono más oscuro al hacer clic
        }
      }}
    >
      <TableCell>{row.nombreServicio}</TableCell>
      <TableCell>{row.costoServicio}</TableCell>
      <TableCell>{row.comisionServicio}</TableCell>
      <TableCell onClick={e => e.stopPropagation()}>
        <IconButton onClick={() => onAdd(row)}>
          <Add />
        </IconButton>
        <IconButton onClick={(e) => {
          e.stopPropagation();
          deleteServicio(row.idServicio);
        }}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <CreateServiciosModal
        open={openServicios}
        onClose={() => setOpenServicios(false)}
        onCreated={() => {
          fetchServices();
          setOpenServicios(false);
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} elevation={6} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
export default ServiciosModal
