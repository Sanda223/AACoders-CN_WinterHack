// backend/src/routes/userDetails.js
import express from "express";
import { body, validationResult } from "express-validator";
import { connectToDatabase } from "../db.js";

const router = express.Router();

router.patch(
  "/user-details",
  [
    body("userID").notEmpty(),
    body("university").isString().notEmpty(),
    body("degree").isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, university, degree } = req.body;

    try {
      const { db } = await connectToDatabase();
      const users = db.collection("users");

      const updateResult = await users.updateOne(
        { userID },
        { $set: { university, degree } }
      );

      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User details updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
