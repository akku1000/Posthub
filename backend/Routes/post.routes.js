import express from "express";
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createpost,getall,like,comment,commentbyid } from "../controllers/post.controller.js";


const router=Router();

router.post('/posts',protectRoute,  upload.fields([
        {
            name:"image",
            maxCount:1
        }
    ]),createpost);
router.get('/allposts',getall)
router.put('/:id/like',protectRoute,like);
router.post('/:id/comment',protectRoute,comment); //post id
router.get('/:id/commentbyid',protectRoute,commentbyid)// post id
export default router;