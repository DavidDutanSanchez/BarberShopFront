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


const ProductoView = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState<Producto>({
    nombreProducto: "",
    costoProducto: 0,
    stockProducto: 0,
    ivaProducto: 0,
    codigoProducto: ""
  });
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllProductos();
      setProductos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
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
      isEdit ? await updateProducto(formData) : await addProducto(formData);
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
      nombreProducto: "",
      costoProducto: 0,
      stockProducto: 0,
      ivaProducto: 0,
      codigoProducto: ""
    });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Gestión de Productos</Typography>

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
            { name: "costoProducto", label: "Costo" },
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
              type={["costoProducto", "stockProducto", "ivaProducto"].includes(name) ? "number" : "text"}
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
