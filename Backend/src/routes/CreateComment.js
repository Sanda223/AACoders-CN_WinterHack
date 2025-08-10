import express from "express";
import { body, validationResult } from "express-validator";
import { connectToDatabase } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post(
  "/newComment",
  [
    body("Content").isString().notEmpty(),
    body("PostID").isString().notEmpty(),
    body("UserID").isString().notEmpty(),
    body("likes").optional().isInt(),
    body("dislikes").optional().isInt(),
    body("pinned").optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {Content, PostID, UserID, likes, dislikes, pinned } = req.body;

    try {
      const { db } = await connectToDatabase();
      const comments = db.collection("Comments");

      const newComment = {
        Content,
        UserID,
        PostID: new ObjectId(PostID),
        likes: likes || 0,
        dislikes: dislikes || 0,
        pinned: pinned || false,
        createdAt: new Date(),
      };

      await comments.insertOne(newComment);
      res.status(201).json({
        message: "Comment created successfully",
        userID: newComment.UserID,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
