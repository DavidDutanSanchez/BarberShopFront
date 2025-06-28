import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, Typography
} from "@mui/material";
import { Persona } from "../Model/Persona";
import {
  getAllPersonas, addPersona, updatePersona, deletePersona
} from "../Controller/Persona";
import PersonaTabla from "./personaTabla";
import { Link } from "react-router-dom";

const PersonaView = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [formData, setFormData] = useState<Persona>({
    idPersona: "",
    cedulaPersona: "",
    nombresPersona: "",
    apellidosPersona: "",
    direccionPersona: "",
    fechaNacimientoPersona: "",
    celularPersona: "",
    correoPersona: "",
  });
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllPersonas();
      setPersonas(data);
    } catch (err) {
      console.error("Error al obtener personas:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPersonas();
      setPersonas(data);
    };
  
    fetchData();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updatePersona(formData);
      } else {
        const { idPersona, ...rest } = formData;
        await addPersona(rest);
      }
      handleClose();
      fetchData();
    } catch (err) {
      console.error("Error al guardar persona:", err);
    }
  };

  const handleEdit = (persona: Persona) => {
    setFormData(persona);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Deseas eliminar esta persona?");
    if (confirmed) {
      await deletePersona(id);
      fetchData();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormData({
      idPersona: "",
      cedulaPersona: "",
      nombresPersona: "",
      apellidosPersona: "",
      direccionPersona: "",
      fechaNacimientoPersona: "",
      celularPersona: "",
      correoPersona: "",
    });
  };

  return (
    <Box p={4}>
     
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Typography variant="h4">Gestión de Personas</Typography>
  <Button
    variant="outlined"
    component={Link}
    to="/MainMenu"
    color="secondary"
  >
    Volver al Menú
  </Button>
</Box>
      
      <Button variant="contained" onClick={() => setOpen(true)}>Agregar Persona</Button>

      <PersonaTabla personas={personas} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Editar Persona" : "Agregar Persona"}</DialogTitle>
        <DialogContent>
          {[
            { name: "cedulaPersona", label: "Cédula" },
            { name: "nombresPersona", label: "Nombres" },
            { name: "apellidosPersona", label: "Apellidos" },
            { name: "direccionPersona", label: "Dirección" },
            { name: "fechaNacimientoPersona", label: "Fecha Nacimiento", type: "date" },
            { name: "celularPersona", label: "Celular" },
            { name: "correoPersona", label: "Correo" }
          ].map(({ name, label, type = "text" }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type}
              value={formData[name as keyof Persona]}
              onChange={handleChange}
              fullWidth
              margin="dense"
              InputLabelProps={type === "date" ? { shrink: true } : undefined}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonaView;
