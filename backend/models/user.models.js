import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";


const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
      type:String,
      required:true,
      minlength:[6,"is should be of 6 characters"]
    },

},{timestamps:true})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return; 

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw new Error("Password hashing failed");
    }
});
userSchema.methods.iscomparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

const User=mongoose.model("User",userSchema);

export default User;