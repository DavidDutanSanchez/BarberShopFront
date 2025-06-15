import React from "react";

import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Producto } from "../Model/Producto";

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
}

const ProductoTabla: React.FC<Props> = ({ productos, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre</TableCell>
        <TableCell>Código</TableCell>
        <TableCell>Costo</TableCell>
        <TableCell>Stock</TableCell>
        <TableCell>IVA</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {productos.map((p) => (
        <TableRow key={p.idproductos}>
          <TableCell>{p.nombreProducto}</TableCell>
          <TableCell>{p.codigoProducto}</TableCell>
          <TableCell>{p.costoProducto}</TableCell>
          <TableCell>{p.stockProducto}</TableCell>
          <TableCell>{p.ivaProducto}%</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(p)}><Edit /></IconButton>
            <IconButton onClick={() => onDelete(p.idproductos!)}><Delete /></IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProductoTabla;
