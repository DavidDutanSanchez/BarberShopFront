import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { ServicioDto } from '../Model/Servicio'
import { addService } from '../Controller/ServiciosService'
import { v4 as uuidv4 } from "uuid";


type CreateServiciosModalProps = {
  open: boolean
  onClose: () => void
  onCreated?: () => void;
}

const CreateServiciosModal = ({ open, onClose, onCreated }: CreateServiciosModalProps) => {
  const [comision, setComision] = useState<string>('')
  const [costo, setCosto] = useState<string>('')
  const [nombre, setNombre] = useState<string>('')

  const CreateServicio = async () => {
    const payload: ServicioDto = {
      idServicio: uuidv4(),
      nombreServicio: nombre.trim(),
      costoServicio: Number(costo),
      comisionServicio: Number(comision)
    }
    await addService({ payload })
    if (onCreated) onCreated();
    else onClose();
  }

  useEffect(() => {
    if (open) {
      setNombre('');
      setCosto('');
      setComision('');
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Crear Servicio</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nombre del servicio"
            value={nombre}
            onChange={e => {
              const val = e.target.value
              if (/^[a-zA-Z\s]*$/.test(val)) {
                setNombre(val)
              }
            }}
            fullWidth
          />

          <TextField
            label="Costo ($)"
            value={costo}
            onChange={e => {
              const val = e.target.value
              if (/^\d*$/.test(val)) {
                setCosto(val)
              }
            }}
            fullWidth
          />

          <TextField
            label="Comisión (%)"
            value={comision}
            onChange={e => {
              const val = e.target.value
              if (/^\d*$/.test(val)) {
                setComision(val)
              }
            }}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={CreateServicio}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateServiciosModal
