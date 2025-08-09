import express from "express";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const { db } = await connectToDatabase();
      const users = db.collection("Users");

      // Find user by email
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Compare password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Login success
      res.json({ message: "Login successful", userID: user.userID, name: user.name });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
