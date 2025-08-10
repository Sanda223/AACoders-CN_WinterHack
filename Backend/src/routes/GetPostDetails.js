//page to get post details
import express from "express";
import { connectToDatabase } from "../db.js";
import { ObjectId } from "mongodb"; 
const router = express.Router();

router.get("/post/:id", async (req, res) => {
  const postId = req.params.id; 
    try {
        const { db } = await connectToDatabase();   
        const posts = db.collection("Posts");
        const post = await posts.findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
