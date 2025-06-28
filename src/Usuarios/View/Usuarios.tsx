import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import {
  getAllUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario
} from "../Controller/Usuario";
import { Usuario } from "../Model/Usuario";
import UsuarioView from "./Usuario";
import UsuarioTabla from "./UsuarioTabla";

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState<Usuario | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const data = await getAllUsuarios();
    setUsuarios(data);
  };

  const handleGuardarUsuario = async (usuario: Omit<Usuario, "idUsuarios">) => {
    try {
      if (editData) {
        await updateUsuario({ ...usuario, idUsuarios: editData.idUsuarios });
      } else {
        await addUsuario(usuario);
      }
      setEditData(null);
      fetchUsuarios();
      setOpenDialog(false);
    } catch (error) {
      console.error("❌ Error al guardar usuario:", error);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditData(usuario);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmed) return;
    await deleteUsuario(id);
    fetchUsuarios();
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  return (
    <Container>
      <Button onClick={() => setOpenDialog(true)} variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
        Nuevo Usuario
      </Button>

      <UsuarioTabla 
      usuarios={usuarios} 
      onEdit={handleEdit}
        onDelete={handleDelete} />

      <UsuarioView 
      />
    </Container>
  );
};

export default Usuarios;
