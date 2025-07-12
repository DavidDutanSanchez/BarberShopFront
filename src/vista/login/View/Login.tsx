
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { loginUsuario } from "../Controller/UsuarioController";
import { UsuarioLogin } from "../Model/Usuario";
import React from "react";
import { DefaultResponseDto } from "../../../Dtos/DefaultResponseDto";


const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<string>("");
  const [contrasenia, setContrasenia] = useState<string>("");

  const handleLogin = async () => {
    try {
      const payload = {
        usuario,
        contrasenia,
      };

      const response = await loginUsuario({ payload });

        localStorage.setItem("usuario", response.usuario);
        localStorage.setItem("rol", response.permisosUsuarios);
        localStorage.setItem("idUsuario", response.idUsuarios);

        if (response.permisosUsuarios.toUpperCase() === "ADMINISTRADOR") {
          navigate("/Ticket");
        } else if (response.permisosUsuarios.toUpperCase() === "BARBERO") {
          navigate("/Ticket");
        } else {
          alert("Rol no reconocido.");
        }

    } catch (error) {
      alert(`Error: ${(error as DefaultResponseDto<null>).message }`);
    }
  };



  const handleCancel = () => {
    setUsuario("");
    setContrasenia("");
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000000, #FFD700)",
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}

        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          boxShadow: 8,
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#000",
            fontSize: "1.8rem",
            mb: 3,
            textTransform: "uppercase",
          }}
        >
          ¡Bienvenido, Administrador!
        </Typography>

        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          required
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#e6c200",
              },
            }}
          >
            Ingresar
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCancel}
            sx={{
              backgroundColor: "#A1887F",
              color: "#fff",
              '&:hover': {
                backgroundColor: "#8D6E63",
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
