import express from "express";
import { Router } from "express";
import { signup,login,logout,refreshToken,getprofile} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router=Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/refresh-token',refreshToken)
router.get('/profile',protectRoute,getprofile);

export default router;