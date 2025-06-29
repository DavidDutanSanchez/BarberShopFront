import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from "@mui/material";
import { Producto } from "../Model/Producto";
import {
  getAllProductos,
  addProducto,
  updateProducto,
  deleteProducto
} from "../Controller/Producto";
import ProductoTabla from "./productoTabla";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

const ProductoView = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState<Producto>({
    idproductos: uuidv4(),
    nombreProducto: "",
    costroProducto: 0,
    stockProducto: 0,
    ivaProducto: 0,
    codigoProducto: "",
  });
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const productos = (await getAllProductos({})).data;
      setProductos(productos);
    } catch (err) {
      console.error("Error al obtener los productos:", err);
      setError("Error al obtener los productos.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("Producto") ? value : Number(value)
    });
  };

  const handleSubmit = async () => {
    if (!formData.nombreProducto || !formData.codigoProducto) {
      alert("El nombre y código del producto son obligatorios.");
      return;
    }

    try {
      if (isEdit) {
        const confirmed = window.confirm("¿Estás seguro de que deseas actualizar este producto?");
        if (!confirmed) return;

        await updateProducto({ payload: formData });
      } else {
        console.log("Agregando producto:", formData);
        await addProducto({ payload: formData });
      }

      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEdit = (producto: Producto) => {
    setFormData(producto);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!confirm) return;

    try {
      await deleteProducto(id);
      fetchData();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };


  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormData({
      idproductos: "",
      nombreProducto: "",
      costroProducto: 0,
      stockProducto: 0,
      ivaProducto: 0,
      codigoProducto: "",
    });
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Gestión de Productos</Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/MainMenu"
          color="secondary"
        >
          Volver al Menú
        </Button>
      </Box>

      {loading && <Typography color="gray">Cargando productos...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
            Agregar Producto
          </Button>

          <ProductoTabla
            productos={productos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Editar Producto" : "Agregar Producto"}</DialogTitle>
        <DialogContent>
          {[
            { name: "nombreProducto", label: "Nombre" },
            { name: "codigoProducto", label: "Código" },
            { name: "costroProducto", label: "Costo" },
            { name: "stockProducto", label: "Stock" },
            { name: "ivaProducto", label: "IVA (%)" },
          ].map(({ name, label }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              value={formData[name as keyof Producto] ?? ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
              type={["costroProducto", "stockProducto", "ivaProducto"].includes(name) ? "number" : "text"}
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

export default ProductoView;
