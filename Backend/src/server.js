// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import DegreeSignupRoute from "./routes/DegreeSignup.js";
import GetCoursesRoute from "./routes/GetCourses.js";
import CourseDetailsRoute from "./routes/CourseDetails.js";
import CreatePostsRoute from "./routes/CreatePosts.js";
import GetPostsRoute from "./routes/GetPosts.js";
import GetPostDetailsRoute from "./routes/GetPostDetails.js";
import CreateCommentRoute from "./routes/CreateComment.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", DegreeSignupRoute);
app.use("/api", GetCoursesRoute);
app.use("/api", CreatePostsRoute);
app.use("/api", CourseDetailsRoute);
app.use("/api", GetPostsRoute);
app.use("/api", GetPostDetailsRoute);
app.use("/api", CreateCommentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));