import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import { userstore } from "../Statemanage/userStore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {login}=userstore();
  const [form, setForm] = useState({
      email: "",
      password: ""
    });
    const navigate=useNavigate();
    const handleclick=()=>{
      login(form)
      navigate("/")
    }
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    return (
      <Container maxWidth="sm" sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#2e4476"
        },
        "&:hover fieldset": {
          borderColor: "#1e293b"
        },
        "&.Mui-focused fieldset": {
          borderColor: "#2e4476"
        }
      }
    }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 10,
            borderRadius: 4,
            border: "1.5px solid #2e4476",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)"
          }}
          
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#2e4476", fontWeight: "bold" }}
          >
            Login to Your Account
          </Typography>
  
          <Box sx={{ mt: 3 }}>
  
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              onChange={handleChange}
            />
  
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              onChange={handleChange}
            />
  
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                background: "#2e4476",
                "&:hover": { background: "#1e293b" }
              }}
              onClick={()=>handleclick()}
            >
              Login
            </Button>
          </Box>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Typography variant="body2" align="center" sx={{ color: "#2e4476", mt: 2 }}>
              Don't have an account? Register here
            </Typography>
          </Link>
        </Paper>
      </Container>
    );
}

export default Login