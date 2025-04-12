
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/MainMenu");

        /*if (email === "admin@example.com" && password === "1234") {
            navigate("../MainMenu/MainMenu");
        } else {
            setError("Correo o contraseña incorrectos.");
        }*/
    }

    return (
        <>
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
                    //value={''}
                    //onChange={console.log()}
                    />
                    <TextField
                        label="Contrtaseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                    //value={''}
                    //onChange={console.log()}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Box>
        </>
    );
};
export default Login;