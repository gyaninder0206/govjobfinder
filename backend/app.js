import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobsRoutes from "./routes/jobs.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import savedJobsRoutes from "./routes/savedJobs.js";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials:true
}));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/saved-jobs", savedJobsRoutes);

app.get("/", (req, res) => {
  res.send("Jobs API running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
