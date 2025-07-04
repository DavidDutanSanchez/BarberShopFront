import React, { useEffect, useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { ticketsCabeceraDto, ticketsDetalleDto } from '../model/ticketsDto'
import { Usuario } from '../../Usuarios/Model/Usuario'
import ServiciosModal from '../../Servicios/View/ListService'
import { ServicioDto } from '../../Servicios/Model/Servicio'
import { v4 as uuidv4 } from "uuid";
import { addTicket } from '../controller/serviceTickets'

type TicketModalProps = {
  open: boolean
  onClose: () => void
  usuarioSelecionado: Usuario
}

const TicketModal = ({ open,
  onClose, usuarioSelecionado }: TicketModalProps) => {
  const [detalle, setDetalle] = useState<ticketsDetalleDto[]>([])
  const [openServicios, setOpenServicios] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const onDelete = (id: string) => {
    const eliminarFila = detalle.filter((item) => item.idTicketsDetalle != id)
    setDetalle(eliminarFila)
  }

  const AgregarServicio = (servicio: ServicioDto) => {
    setDetalle(prev =>
      prev.find(x => x._servicio_id === servicio.idServicio)
        ? prev.map(item =>
          item._servicio_id === servicio.idServicio
            ? {
              ...item,
              cantidadTicketDet: item.cantidadTicketDet + 1,
              subTotalTicketDet:
                servicio.costoServicio * (item.cantidadTicketDet + 1),
            }
            : item
        )
        : [
          ...prev,
          {
            idTicketsDetalle: uuidv4(),
            _servicio_id: servicio.idServicio,
            _ticket_cabecera: '',
            fechaTicketDet: new Date(),
            cantidadTicketDet: 1,
            subTotalTicketDet: servicio.costoServicio,
            servicios: servicio,
          },
        ]
    );
  };

  const GuardarTicket = async () => {
    try {
      if (detalle.length <= 0) {
        setSnackbar({
          open: true,
          message: 'Debe agregar al menos un servicio antes de emitir el ticket.',
          severity: 'error'
        });
        return;
      } else {
        const idnuevo = uuidv4();

        const detalleConCabecera = detalle.map(line => ({
          ...line,
          _ticket_cabecera: idnuevo,
        }));

        const payload: ticketsCabeceraDto = {
          idTickets: idnuevo,
          fechaTicket: new Date(),
          estadoTicketCab: true,
          totalTicketCab: detalleConCabecera.reduce(
            (sum, line) => sum + line.subTotalTicketDet,
            0
          ),
          _usuario_id: usuarioSelecionado.idUsuarios,
          detalle_tickets: detalleConCabecera,
        };

        await addTicket({ payload })
        setSnackbar({
          open: true,
          message: 'Ticket emitido correctamente.',
          severity: 'success'
        });

        onClose();
        setDetalle([]);
      }

    } catch (error) {
      setSnackbar({
        open: true,
        message: error as string || 'Error al emitir el ticket.',
        severity: 'error'
      });
    }
  }

  useEffect(() => {
    if (open) {
      setDetalle([])
    }
  }, [open]);

  const handleCloseSnackbar = () => {
    setSnackbar(s => ({ ...s, open: false }));
  };
  return (<>
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Tickets de {usuarioSelecionado.usuario}</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" onClick={() => setOpenServicios(true)}
          >
            Agregar un Servicio
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Servicio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio U.</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalle.map(row => (
                <TableRow key={row.idTicketsDetalle}>
                  <TableCell>{row.servicios?.nombreServicio}</TableCell>
                  <TableCell>{row.cantidadTicketDet}</TableCell>
                  <TableCell>{(row.servicios?.costoServicio ?? 0)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onDelete(row.idTicketsDetalle)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell>{(row.servicios?.costoServicio ?? 0) * row.cantidadTicketDet}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()}>Cerrar</Button>
        <Button variant="contained" onClick={() => GuardarTicket()}>
          Emitir Ticket
        </Button>
      </DialogActions>
    </Dialog>

    <ServiciosModal
      open={openServicios}
      onClose={() => setOpenServicios(false)}
      onAdd={(servicio) => {
        AgregarServicio(servicio)
        setOpenServicios(false)
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
export default TicketModal 
