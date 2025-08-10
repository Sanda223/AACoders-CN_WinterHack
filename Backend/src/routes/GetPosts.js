//get the posts from the database
import express from "express";
import { connectToDatabase } from "../db.js";  

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const posts = db.collection("Posts");
    const postList = await posts.find({}).toArray();
    res.status(200).json(postList);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
