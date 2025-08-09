import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

router.get("/courses", async (req, res) => {
  const { code, degree, university } = req.query;

  try {
    const { db } = await connectToDatabase();
    const courses = db.collection("courses");

    // Build MongoDB query object
    const query = {};

    if (code) {
      query.courseCode = { $regex: new RegExp(code, "i") };
    }
    if (degree) {
      query.degree = { $regex: new RegExp(degree, "i") };
    }
    if (university) {
      query.university = { $regex: new RegExp(university, "i") };
    }

    const results = await courses
      .find(query)
      .limit(50) // limit results for performance
      .toArray();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
