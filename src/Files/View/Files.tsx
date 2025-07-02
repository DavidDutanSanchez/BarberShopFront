import React, { useEffect, useState } from "react";
import {
    Box, Typography, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, FormControl,
    InputLabel, Select, MenuItem
} from "@mui/material";
import { File } from "../Model/Files";
import { Persona } from "../../Personas/Model/Persona";
import { v4 as uuidv4 } from "uuid";
import { getAllFiles, addFile, updateFile, deleteFile } from "../Controller/Files";
import { getAllPersonas } from "../../Personas/Controller/Persona";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const FileView = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [formData, setFormData] = useState<File>({
        idFiles: uuidv4(),
        nombreArchivoFiles: "",
        tamanioFiles: 0,
        extencionFiles: "",
        pathFiles: "",
        _persona_id: ""
    });
    const [editId, setEditId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const fetchData = async () => {
        const data = await getAllFiles({} as GlobalQueryParams<File>);
        const pData = await getAllPersonas({} as GlobalQueryParams<Persona>).then(res => res.data);
        setFiles(data.data);
        setPersonas(pData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                nombreArchivoFiles: file.name,
                tamanioFiles: file.size,
                extencionFiles: file.type,
                pathFiles: reader.result as string
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        const payload = { ...formData };

        if (editId) await updateFile({ payload });
        else await addFile({ payload: { ...formData, idFiles: uuidv4() } });

        handleClose();
        fetchData();
    };

    const handleEdit = (file: File) => {
        setEditId(file.idFiles);
        setFormData(file);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Deseas eliminar este archivo?")) return;
        await deleteFile(id);
        fetchData();
    };

    const handleClose = () => {
        setOpen(false);
        setEditId(null);
        setFormData({
            idFiles: uuidv4(),
            nombreArchivoFiles: "",
            tamanioFiles: 0,
            extencionFiles: "",
            pathFiles: "",
            _persona_id: ""
        });
    };




    return (
        <Box p={4}>


<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
  <Typography variant="h4" fontWeight="bold">
    Gestión de Archivos
  </Typography>

  <Button
    variant="outlined"
    startIcon={<ArrowBackIcon />}
    component={RouterLink}
    to="/MainMenu"
    color="secondary"
  >
    Volver al Menú
  </Button>
</Box>




            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 4 }}>
                AGREGAR ARCHIVO
            </Button>

            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h6" fontWeight="bold">Imagen Persona</Typography>
                {files.map((file) => {
                    const persona = personas.find(p => p.idPersona === file._persona_id);
                    return (
                        <Box
                            key={file.idFiles}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            p={2}
                            border="1px solid #ccc"
                            borderRadius="12px"
                            boxShadow={1}
                        >
                            <Box display="flex" alignItems="center" gap={2}>
                                {file.extencionFiles.startsWith("image/") ? (
                                    <img
                                        src={file.pathFiles}
                                        alt={file.nombreArchivoFiles}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            objectFit: "cover",
                                            borderRadius: "50%"
                                        }}
                                    />
                                ) : (
                                    <Box
                                        width={70}
                                        height={70}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bgcolor="#eee"
                                        borderRadius="50%"
                                        fontSize="12px"
                                        color="#888"
                                    >
                                        No Imagen
                                    </Box>
                                )}
                                <Typography variant="subtitle1">{persona?.nombresPersona}</Typography>
                            </Box>

                            <Box display="flex" gap={1}>
                                <IconButton onClick={() => handleEdit(file)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(file.idFiles)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            {/* Dialogo para agregar/editar archivo */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Editar Archivo" : "Agregar Archivo"}</DialogTitle>
                <DialogContent>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
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
                    <Button variant="contained" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

};

export default FileView;
