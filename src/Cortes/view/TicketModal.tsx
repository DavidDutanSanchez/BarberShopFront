import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { ticketsDetalleDto } from '../model/ticketsDto'
import { Usuario } from '../../Usuarios/Model/Usuario'

type TicketModalProps = {
  open: boolean
  onClose: () => void
  usuarioSelecionado: Usuario
}

export default function TicketModal({ open,
  onClose, usuarioSelecionado }: TicketModalProps) {
  const [detalle, setDetalle] = useState<ticketsDetalleDto[]>([])


  const handleActionOne = () => {
    console.log('Action One clicked')
  }
  const handleActionTwo = () => {
    console.log('Action Two clicked')
  }
  const handleSaveTicket = () => {
    console.log('Action Two clicked')
  }

  const onDelete = (id: string) => {
    const eliminarFila = detalle.filter((item) => item.IdTicketsDetalle != id)
    setDetalle(eliminarFila)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Tickets de {usuarioSelecionado.usuario}</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" onClick={() => console.log('Action One')}>
            Action One
          </Button>
          <Button variant="outlined" onClick={() => console.log('Action Two')}>
            Action Two
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Detalle</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalle.map(row => (
                <TableRow key={row.IdTicketsDetalle}>
                  <TableCell>{row.IdTicketsDetalle}</TableCell>
                  <TableCell>{row.SubTotalTicketDet.toString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onDelete(row.IdTicketsDetalle)}>
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
        <Button variant="contained" onClick={() => console.log('Guardar')}>
          Emitir Ticket
        </Button>
      </DialogActions>
    </Dialog>
  )
}
