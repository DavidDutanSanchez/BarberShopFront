import React from "react";

import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Persona } from "../Model/Persona";

interface Props {
  personas: Persona[];
  onEdit: (persona: Persona) => void;
  onDelete: (id: string) => void;
}

const PersonaTabla: React.FC<Props> = ({ personas, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombres</TableCell>
        <TableCell>Apellidos</TableCell>
        <TableCell>Cédula</TableCell>
        <TableCell>Correo</TableCell>
        <TableCell>Celular</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {personas.map((p) => (
        <TableRow key={p.idPersona}>
          <TableCell>{p.nombresPersona}</TableCell>
          <TableCell>{p.apellidosPersona}</TableCell>
          <TableCell>{p.cedulaPersona}</TableCell>
          <TableCell>{p.correoPersona}</TableCell>
          <TableCell>{p.celularPersona}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(p)}><Edit /></IconButton>
            <IconButton onClick={() => onDelete(p.idPersona!)}><Delete /></IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default PersonaTabla;
