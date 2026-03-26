import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar
} from "@mui/material";
import { Link } from "react-router-dom";
import { userstore } from "../Statemanage/userStore";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
 const {user,logout}=userstore();
 const navigate=useNavigate();
  const handlelogout=async()=>{
    await logout();
    navigate("/")
  }
  return (
    <AppBar
      position="sticky"
  sx={{
    top: 0,
    zIndex: 1000,
    background: "#2e4476"
  }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer"
          }}
          component={Link}
          to="/"
          color="inherit"
        >
          SocialPost
        </Typography>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {!user ? (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    background: "#1e293b"
                  }
                }}
              >
                Login
              </Button>

              <Button
                 component={Link}
                to="/signup"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    background: "#1e293b"
                  }
                }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/feed"
                variant="outlined"
               sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    background: "#1e293b"
                  }
                }}
              >
                Feed
              </Button>

              {/* <Avatar sx={{ width: 32, height: 32 }}>
                A
              </Avatar> */}

              <Button
               sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    background: "#ef4444"
                  }
                }}
                onClick={()=>handlelogout()}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;