import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { userstore } from "../Statemanage/userStore";

const Homepage = () => {

  const {user}=userstore();
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #2e4476, #1e293b)",
        color: "#fff",
      }}
    >
      
  <Box
    sx={{
      width: "100%",
      maxWidth: "1200px",
      mx: "auto",
      px: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 4
    }}
  >
        
        {/* LEFT CONTENT */}
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Like. Post. Comment. Grow.
          </Typography>

          <Typography sx={{ mb: 3, color: "#cbd5e1" }}>
            Build your social presence, share your thoughts, and connect with people worldwide.
          </Typography>
        
          {!user&&
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                background: "#fff",
                color: "#2e4476",
                fontWeight: "bold",
                "&:hover": {
                  background: "#e2e8f0"
                }
              }}
            >
              Get Started
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  background: "#1e293b"
                }
              }}
            >
              Login
            </Button>
          </Box>}
        </Box>

        {/* RIGHT SIDE (IMAGE) */}
        <Box
          component="img"
          src="https://www.shutterstock.com/image-vector/like-comment-share-buttons-set-260nw-2251897383.jpg"
          alt="social"
          sx={{
            width: { xs: "100%", md: 400 }
          }}
        />
      </Box>
    </Box>
  );
};

export default Homepage;