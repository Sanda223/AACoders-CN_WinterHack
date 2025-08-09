import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

router.get("/courses", async (req, res) => {
  const { query } = req.query; // one search param instead of three

  try {
    const { db } = await connectToDatabase();

    // Build match condition
    const match = query
      ? {
          $or: [
            { UnitCode: { $regex: new RegExp(query, "i") } },
            { Name: { $regex: new RegExp(query, "i") } }, // Unit Name
            { DegreeCode: { $regex: new RegExp(query, "i") } },
            { "degreeInfo.Name": { $regex: new RegExp(query, "i") } },
            { "universityInfo.Name": { $regex: new RegExp(query, "i") } },
            { "universityInfo.Short": { $regex: new RegExp(query, "i") } },
          ],
        }
      : {};

    const results = await db.collection("Units").aggregate([
      // Join with Degrees
      {
        $lookup: {
          from: "Degrees",
          localField: "DegreeCode",
          foreignField: "DegreeCode",
          as: "degreeInfo"
        }
      },
      { $unwind: "$degreeInfo" },

      // Join with Universities
      {
        $lookup: {
          from: "Universities",
          localField: "degreeInfo.UniversitiesID",
          foreignField: "_id",
          as: "universityInfo"
        }
      },
      { $unwind: "$universityInfo" },

      { $match: match }, // now uses one search param

      {
        $project: {
          UnitCode: 1,
          UnitName: "$Name",
          DegreeCode: 1,
          DegreeName: "$degreeInfo.Name",
          UniversityName: "$universityInfo.Name",
          UniversityShort: "$universityInfo.Short",
          State: "$universityInfo.State"
        }
      },

      { $limit: 50 }
    ]).toArray();

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
