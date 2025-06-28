import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    //navigate("/Login");
    navigate("/MainMenu");
  };

  const handleCancel = () => {
    navigate(-1);
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
        onSubmit={handleLogin}
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
