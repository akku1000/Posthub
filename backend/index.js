import express from 'express'
import dotenv from "dotenv"
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/user.routes.js';
import postRoutes from './Routes/post.routes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app=express();

app.use(cors({
  origin: "https://posthub-nine.vercel.app",
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',userRoutes);
app.use('/api/post',postRoutes);


app.listen(process.env.PORT||5000,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
