import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
// Icons make the UI look much more professional
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom"
import { userstore } from "../Statemanage/userStore";


const Feed = () => {
  // State for the "Create Post" functionality
  const {user,createpost,posts,allpost,like,commentbyid,specificpost}=userstore()
  const navigate=useNavigate();
  
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

   useEffect(() => {
     allpost()
   }, [])
   
  const handlecomment = async(postid) => {
    //  await commentbyid(postid)
     navigate(`/comment/${postid}`)
  };

  const handlelike=async(postid)=>{
      await like(postid)
  }
  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Clear image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handlePostSubmit = () => {
    createpost({ text: postText, image: selectedImage })
     setSelectedImage(null);
     setImagePreview(null);
     setPostText("");
  };

  return (
    <Box sx={{ background: "#e5e8ef", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="sm">
        

        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#2e4476" }}>A</Avatar>
              <TextField
                fullWidth
                multiline
                rows={imagePreview ? 1 : 2}
                placeholder="What's on your mind?"
                variant="standard"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </Box>

            {/* Image Preview Area */}
            {imagePreview && (
              <Box sx={{ mt: 2, position: "relative" }}>
                <IconButton
                  onClick={removeImage}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: "100%", borderRadius: "8px", maxHeight: "300px", objectFit: "cover" }}
                />
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button
                component="label"
                startIcon={<PhotoCameraIcon />}
                sx={{ color: "#2e4476", textTransform: "none", fontWeight: 600 }}
              >
                Photo
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>

              <Button
                variant="contained"
                onClick={handlePostSubmit}
                disabled={!postText && !selectedImage}
                sx={{
                  background: "#2e4476",
                  borderRadius: "20px",
                  px: 4,
                  textTransform: "none",
                  "&:hover": { background: "#1e293b" },
                }}
              >
                Post
              </Button>
            </Box>
          </CardContent>
        </Card>

       
        {posts.map((post) => (
          <Card key={post._id} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              {/* User Header */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: "#2e4476" }}>A</Avatar>
                <Typography sx={{ fontWeight: "bold", color: "#2e4476" }}>
                  {post.user}
                </Typography>
              </Box>

              {/* Text Content */}
              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.text}
              </Typography>

              {/* Post Image (If exists) */}
              {post.image && (
                <Box sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                  <img src={post.image} alt="post" style={{ width: "100%", display: "block" }} />
                </Box>
              )}

              <Divider />

              {/* Action Buttons */}
              <Box sx={{ mt: 1, display: "flex", justifyContent: "space-around" }}>
                <Button 
                  fullWidth 
                  startIcon={post.likes.includes(user._id) ?<ThumbUpRoundedIcon /> : <ThumbUpOutlinedIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={()=>handlelike(post._id)}
                >
                  Like ({post.likes.length})
                </Button>
                <Button 
            fullWidth 
            startIcon={<ChatBubbleOutlineIcon />} 
            onClick={() => handlecomment(post._id)}
          >
            Comment ({post.comments.length})
          </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Feed;