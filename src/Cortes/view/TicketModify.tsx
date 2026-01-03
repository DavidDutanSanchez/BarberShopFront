import { useEffect, useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { ticketsCabeceraDto, ticketsDetalleDto } from '../model/ticketsDto'
import { getTicketById, updateTicket } from '../controller/serviceTickets'
import dayjs from 'dayjs';
import ServiciosModal from '../../Servicios/View/ListService'
import { ServicioDto } from '../../Servicios/Model/Servicio'
import { v4 as uuidv4 } from "uuid";

type TicketModifyModalProps = {
  open: boolean
  onClose: () => void
  cabeceraId: string
}

const TicketModifyModal = ({ open,
  onClose, cabeceraId }: TicketModifyModalProps) => {
  const [detalle, setDetalle] = useState<ticketsDetalleDto[]>([])
  const [cabecera, setCabecera] = useState<ticketsCabeceraDto>()

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
            // fechaTicketDet: new Date(),
            fechaTicketDet: dayjs().tz("America/Guayaquil").toDate(),
            cantidadTicketDet: 1,
            subTotalTicketDet: servicio.costoServicio,
            servicios: servicio,
          },
        ]
    );
  };

  const ModificarTicket = async () => {
    try {
      if (detalle.length <= 0) {
        setSnackbar({
          open: true,
          message: 'No puede dejar el detalle del Ticket vacío, elegir un servicio al menos o anular todo el ticket.',
          severity: 'error'
        });
        return;
      } else {
        detalle.forEach(item => {
          item._ticket_cabecera = cabeceraId
        })
        const payload: ticketsCabeceraDto = {
          detalle_tickets: detalle,
          idTickets: cabecera?.idTickets || '',
          fechaTicket: cabecera?.fechaTicket || new Date(),
          estadoTicketCab: cabecera?.estadoTicketCab || true,
          totalTicketCab: detalle.reduce((acc, item) => acc + item.subTotalTicketDet, 0),
          _usuario_id: cabecera?._usuario_id || '',
        }
        await updateTicket({ payload })

        setSnackbar({
          open: true,
          message: 'Ticket modificado correctamente.',
          severity: 'success'
        });

        onClose();
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

  const fetchTicket = async () => {
    try {
      const ticket = await getTicketById(cabeceraId)
      setDetalle(ticket.detalle_tickets ?? [])
      setCabecera(ticket)
    } catch (error) {
      setSnackbar({
        open: true,
        message: error as string || 'Error al cargar ticket.',
        severity: 'error'
      });
    }
  }

  useEffect(() => {
    if (open) {
      fetchTicket()
    }
  }, [open]);


  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Detalle de Ticket</DialogTitle>
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
          <Button variant="contained" onClick={() => ModificarTicket()}>
            Modifcar Ticket
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
export default TicketModifyModal 
