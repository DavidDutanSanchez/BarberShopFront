import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Stack,
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        //navigate("/MainMenu");
        navigate("/Login"); // Redirige a la página de inicio de sesión
    };

    const handleCancel = () => {
        navigate(-1); // Regresa a la página anterior
        // También puedes usar: navigate("/") para ir a la portada
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <Box
                component="form"
                sx={{
                    width: 360,
                    p: 3,
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 2,
                    boxShadow: 1,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                <TextField
                    label="Correo"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                />

                <Stack spacing={2} direction="column" sx={{ mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Ingresar
                    </Button>
                    <Button
  variant="contained"
  fullWidth
  onClick={handleCancel}
  sx={{
    backgroundColor: "#FFA726", // Naranja suave
    color: "#fff",
    '&:hover': {
      backgroundColor: "#FB8C00", // Más intenso al pasar el mouse
    }
  }}
>
  Cancelar
</Button>

                </Stack>
            </Box>
        </Box>
    );
};

export default Login;
