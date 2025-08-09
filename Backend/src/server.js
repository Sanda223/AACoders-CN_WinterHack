// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import DegreeSignupRoute from "./routes/DegreeSignup.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", DegreeSignupRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));