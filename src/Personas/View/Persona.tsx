import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from "@mui/material";
import { Persona } from "../Model/Persona";
import {
  getAllPersonas,
  addPersona,
  updatePersona,
  deletePersona
} from "../Controller/Persona";
import PersonaTabla from "./personaTabla";

const PersonaView = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [formData, setFormData] = useState<Persona>({
    cedulaPersona: "",
    nombresPersona: "",
    apellidosPersona: "",
    direccionPersona: "",
    celularPersona: "",
    correoPersona: ""
  });
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllPersonas();
      setPersonas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Error al obtener la lista de personas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validación básica
    if (!formData.nombresPersona || !formData.apellidosPersona || !formData.cedulaPersona) {
      alert("Por favor completa al menos nombre, apellido y cédula.");
      return;
    }

    try {
      if (isEdit) {
        await updatePersona(formData);
      } else {
        await addPersona(formData);
      }
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error al guardar persona:", error);
    }
  };

  const handleEdit = (persona: Persona) => {
    setFormData(persona);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePersona(id);
      fetchData();
    } catch (err) {
      console.error("Error al eliminar persona:", err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormData({
      cedulaPersona: "",
      nombresPersona: "",
      apellidosPersona: "",
      direccionPersona: "",
      celularPersona: "",
      correoPersona: ""
    });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Gestión de Personas</Typography>

      {loading && <Typography color="gray">Cargando datos...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
            Agregar Persona
          </Button>

          <PersonaTabla
            personas={personas}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Editar Persona" : "Agregar Persona"}</DialogTitle>
        <DialogContent>
          {[
            "nombresPersona",
            "apellidosPersona",
            "cedulaPersona",
            "direccionPersona",
            "celularPersona",
            "correoPersona"
          ].map((field) => (
            <TextField
              key={field}
              label={field}
              name={field}
              value={formData?.[field as keyof Persona] ?? ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
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
