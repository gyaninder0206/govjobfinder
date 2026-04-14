import express from "express";
import { fetchExternalJobs } from "../services/externalJobsApi.js";
import { normalizeJobs } from "../utils/normalizeJobs.js";
import { getCachedJobs } from "../services/cache.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // ✅ USE CACHE HERE
    const rawJobs = await getCachedJobs(fetchExternalJobs);
    const jobs = normalizeJobs(rawJobs);

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

export default router;
