import React from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Usuario } from "../Model/Usuario";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void;
}

const UsuarioTabla: React.FC<Props> = ({ usuarios, onEdit, onDelete }) => {
  return (
    // <Table>     
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell><strong>Usuario</strong></TableCell>
    //         <TableCell><strong>Permiso</strong></TableCell>
    //         <TableCell><strong>ID Persona</strong></TableCell>
    //         <TableCell align="right"><strong>Acciones</strong></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {usuarios.map((usuario) => (
    //         <TableRow key={usuario.idUsuarios}>
    //           <TableCell>{usuario.usuario}</TableCell>
    //           <TableCell>{usuario.permisosUsuarios}</TableCell>
    //           <TableCell>{usuario._persona_id}</TableCell>
    //           <TableCell align="right">
    //             <IconButton color="primary" onClick={() => onEdit(usuario)}>
    //               <EditIcon />
    //             </IconButton>
    //             <IconButton color="error" onClick={() => onDelete(usuario.idUsuarios)}>
    //               <DeleteIcon />
    //             </IconButton>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </Table>

    /////////////////////

     <Table>
        <TableHead>
          <TableRow>
          <TableCell><strong>Usuario</strong></TableCell>
            <TableCell><strong>Permiso</strong></TableCell>
            <TableCell><strong>Persona</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.idUsuarios}>
               <TableCell>{usuario.usuario}</TableCell>
              <TableCell>{usuario.permisosUsuarios}</TableCell>
              <TableCell>{usuario.personaNombreCompleto}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(usuario)}><Edit /></IconButton>
                <IconButton onClick={() => onDelete(usuario.idUsuarios!)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      
      </Table>
  );
};

export default UsuarioTabla;
