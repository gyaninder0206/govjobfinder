import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

function getJobId(job) {
  return job.applyLink || `${job.title}-${job.lastDate}`;
}

router.get("/", requireAuth, async (req, res) => {
  res.json(req.user.savedJobs || []);
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, lastDate, applyLink } = req.body;

    if (!title || !applyLink) {
      return res.status(400).json({ message: "Title and apply link are required" });
    }

    const newJob = {
      title,
      lastDate: lastDate || "Not specified",
      applyLink,
    };

    const alreadySaved = (req.user.savedJobs || []).some(
      (job) => getJobId(job) === getJobId(newJob)
    );

    if (alreadySaved) {
      return res.status(409).json({ message: "Job already saved" });
    }

    req.user.savedJobs.unshift(newJob);
    await req.user.save();

    res.status(201).json(req.user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to save job" });
  }
});

router.delete("/", requireAuth, async (req, res) => {
  try {
    const { title, lastDate, applyLink } = req.body;

    if (!title || !applyLink) {
      return res.status(400).json({ message: "Title and apply link are required" });
    }

    const jobToRemove = { title, lastDate, applyLink };

    req.user.savedJobs = (req.user.savedJobs || []).filter(
      (job) => getJobId(job) !== getJobId(jobToRemove)
    );

    await req.user.save();

    res.json(req.user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove saved job" });
  }
});

export default router;
