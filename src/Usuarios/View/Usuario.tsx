import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, FormControl,
  InputLabel, Select, MenuItem
} from "@mui/material";
import { Usuario } from "../Model/Usuario";
import {
  getAllUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario
} from "../Controller/Usuario";
import { getAllPersonas } from "../../Personas/Controller/Persona";
import { Persona } from "../../Personas/Model/Persona";
import { Link } from "react-router-dom";
import UsuarioTabla from "./UsuarioTabla"; 

const UsuarioView = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [formData, setFormData] = useState<Omit<Usuario, "idUsuarios">>({
    usuario: "",
    contraseniaUsuarios: "",
    permisosUsuarios: "",
    _persona_id: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [usuariosData, personasData] = await Promise.all([
        getAllUsuarios(),
        getAllPersonas(),
      ]);
      setUsuarios(usuariosData);
      setPersonas(personasData);
    } catch (err) {
      setError("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name?: string; value: unknown } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value as string,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateUsuario({ ...formData, idUsuarios: editId });
      } else {
        await addUsuario(formData);
      }
      handleClose();
      fetchData();
    } catch (err) {
      console.error("Error al guardar el usuario", err);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    const { idUsuarios, ...rest } = usuario;
    setEditId(idUsuarios);
    setFormData(rest);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Deseas eliminar este usuario?");
    if (!confirm) return;
    await deleteUsuario(id);
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setFormData({
      usuario: "",
      contraseniaUsuarios: "",
      permisosUsuarios: "",
      _persona_id: "",
    });
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Gestión de Usuarios</Typography>
        <Button variant="outlined" component={Link} to="/MainMenu" color="secondary">
          Volver al Menú
        </Button>
      </Box>
  
      {loading && <Typography>Cargando...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
  
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Agregar Usuario
      </Button>
  
      <UsuarioTabla
        usuarios={usuarios}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="contraseniaUsuarios"
            type="password"
            value={formData.contraseniaUsuarios}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Permisos</InputLabel>
            <Select
              name="permisosUsuarios"
              value={formData.permisosUsuarios}
              onChange={handleChange}
              label="Permisos"
            >
              <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
              <MenuItem value="EMPLEADO">Empleado</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Persona</InputLabel>
            <Select
              name="_persona_id"
              value={formData._persona_id}
              onChange={handleChange}
              label="Persona"
            >
              {personas.map((persona) => (
                <MenuItem key={persona.idPersona} value={persona.idPersona}>
                  {persona.nombresPersona} {persona.apellidosPersona}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}  
export default UsuarioView;
