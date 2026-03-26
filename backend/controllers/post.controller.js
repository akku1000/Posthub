import Post from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




const createpost  = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        
        let imageUrl = "";
        if (req.files?.image?.[0]) {
            const localPath = req.files.image[0].path;
            
            const cloudinaryResponse = await uploadOnCloudinary(localPath)
            
            if (cloudinaryResponse) {
                imageUrl = cloudinaryResponse.secure_url;
            }
        }

        if (!text && !imageUrl) {
            return res.status(400).json({ message: "Post must contain text or an image" });
        }

        const newPost = await Post.create({
            user: userId,
            text,
            image: imageUrl
        });

        res.status(201).json({
  message: "post created successfully",
  post: newPost
});
    } catch (error) {
        // SAFETY: Only unlink here if the file still exists and something else failed
        // if (req.files?.image?.[0]?.path && fs.existsSync(req.files.image[0].path)) {
        //     fs.unlinkSync(req.files.image[0].path);
        // }
        res.status(500).json({ message: error.message });
    }
};
const getall=async(req,res)=>{
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.json(posts)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const like=async(req,res)=>{
    const userid=req.user._id;
    const postid=req.params.id;
    if(!userid){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const post = await Post.findById(postid);
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        if(post.likes.includes(userid)){// it is already liked so toggle
            post.likes = post.likes.filter((id) => id.toString() !== userid.toString());
        }
        else{
           post.likes.push(userid);
        }
        await post.save();
        res.status(200).json({ message: "sucess", likes: post.likes });
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

const comment=async(req,res)=>{
    const username=req.user.name;
    const postid=req.params.id;
    const {text}=req.body;
    if(!username){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        if(!text){
            return res.status(400).json({message:"text is required"})
        }
        const post=await Post.findById(postid);
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        
        post.comments.push({user:username,text})
        await post.save();
        res.status(201).json({ message: "Comment added", comments: post.comments })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const commentbyid=async(req,res)=>{
    
    const postid=req.params.id;

    try {
       const post = await Post.findById(postid); 
       console.log("hello")
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export {createpost,getall,like,comment,commentbyid};