// backend/src/routes/signup.js
import express from "express";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const { db } = await connectToDatabase();
      const users = db.collection("Users");

      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await users.insertOne({
        userID: uuidv4(),
        name,
        email,
        passwordHash: hashedPassword,
        createdAt: new Date(),
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;