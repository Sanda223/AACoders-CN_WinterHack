import express from "express";
import { body, validationResult } from "express-validator";
import { connectToDatabase } from "../db.js";


const router = express.Router();

router.post(
  "/newPost",
  [
    body("title").isString().notEmpty(),
    body("content").isString().notEmpty(),
    body("userID").isString().notEmpty(),
    body("DegreeCode").isString().optional(),
    body("CourseCode").isString().optional(),
    body("likes").isInt().optional(),
    body("Dislikes").isInt().optional(),
    body("pinned").isBoolean().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, userID, DegreeCode, CourseCode, likes, dislikes, pinned } = req.body;

    try {
      const { db } = await connectToDatabase();
      const posts = db.collection("Posts");

      const newPost = {
        title,
        content,
        userID: "ff5f6818-982b-4358-b3e9-790fa4d8be41",// Placeholder for userID, replace with actual userID from request
        DegreeCode,
        CourseCode,
        likes: likes || 0,
        dislikes: dislikes || 0,
        pinned: pinned || false,
        createdAt: new Date(),
      };

      await posts.insertOne(newPost);
      res.status(201).json({ 
        message: "Post created successfully",
        userID: newPost.userID
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;