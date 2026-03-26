import mongoose,{Schema} from "mongoose";


const postSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
    user:{
        type:String
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    }]
},{timestamps:true})

postSchema.pre("validate", function () {
    if (!this.text && !this.image) {
        next(new Error("Post must have either text or image"));
    }
});

const Post=mongoose.model("Post",postSchema);

export default Post;