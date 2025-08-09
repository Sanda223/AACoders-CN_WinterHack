import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

router.get("/courses/:courseCode/posts", async (req, res) => {
  const { courseCode } = req.params;

  try {
    const { db } = await connectToDatabase();
    const posts = db.collection("posts");

    const coursePosts = await posts
      .find({ courseCode: courseCode.toUpperCase() }) // or lowercase, depends on your data
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    res.json(coursePosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
