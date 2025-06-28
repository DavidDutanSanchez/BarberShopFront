import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Persona } from "../Model/Persona";

interface Props {
  personas: Persona[];
  onEdit: (persona: Persona) => void;
  onDelete: (id: string) => void;
}

const PersonaTabla: React.FC<Props> = ({ personas, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cédula</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Fecha Nacimiento</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {personas.map((p) => (
            <TableRow key={p.idPersona}>
              <TableCell>{p.cedulaPersona}</TableCell>
              <TableCell>{p.nombresPersona}</TableCell>
              <TableCell>{p.apellidosPersona}</TableCell>
              <TableCell>{p.direccionPersona}</TableCell>
              <TableCell>{p.fechaNacimientoPersona?.substring(0, 10)}</TableCell>
              <TableCell>{p.celularPersona}</TableCell>
              <TableCell>{p.correoPersona}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(p)}><Edit /></IconButton>
                <IconButton onClick={() => onDelete(p.idPersona)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PersonaTabla;
