import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { userstore } from "../Statemanage/userStore";

const Comment = () => {
  const { id } = useParams();
  const { specificpost, commentbyid,comment } = userstore();

  const [text, setText] = useState("");

 
  useEffect(() => {
    commentbyid(id);
  }, [id]);

  if (!specificpost) {
    return (
      <Typography sx={{ p: 3 }}>
        Loading...
      </Typography>
    );
  }

  const handlesend = () => {
  if (!text.trim()) return;

  comment(id, text); 
  setText("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#e5e8ef",
      }}
    >

      {/* 🔹 Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <Container maxWidth="sm">

          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>

              {/* User */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: "#2e4476" }}>
                  {specificpost.user?.[0] || "U"}
                </Avatar>

                <Typography sx={{ fontWeight: "bold", color: "#2e4476" }}>
                  {specificpost.user.slice(0, 6)}...
                </Typography>
              </Box>

              {/* Text */}
              <Typography sx={{ mb: 2 }}>
                {specificpost.text}
              </Typography>

    
              {specificpost.image && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={specificpost.image}
                    alt="post"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}

              <Divider />
            </CardContent>
          </Card>

        
          {specificpost.comments?.length === 0 ? (
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              No comments yet
            </Typography>
          ) : (
            specificpost.comments.map((c) => (
              <Box
                key={c._id}
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  background: "#fff",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#2e4476",
                  }}
                >
                  {c.user} 
                </Typography>

                <Typography>{c.text}</Typography>
              </Box>
            ))
          )}

        </Container>
      </Box>

     
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          position: "sticky",
          bottom: 0,
          py: 2,
          background: "#e5e8ef",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              gap: 2,
              background: "#fff",
              p: 1,
              borderRadius: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="small"
            />

            <Button
              variant="contained"
              sx={{
                background: "#2e4476",
                "&:hover": { background: "#1e293b" },
              }}
              onClick={handlesend}
            >
              Send
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Comment;