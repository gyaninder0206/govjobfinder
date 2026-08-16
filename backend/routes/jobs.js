import express from "express";
import { fetchExternalJobs } from "../services/externalJobsApi.js";
import { attachUserIfPresent } from "../middleware/auth.js";
import { getCachedJobDetails, getCachedJobs } from "../services/cache.js";
import { scrapeJobDetails } from "../services/jobDetailsScraper.js";
import { personalizeJobs } from "../services/personalization.js";
import { normalizeJobs } from "../utils/normalizeJobs.js";

const router = express.Router();

router.get("/", attachUserIfPresent, async (req, res) => {
  try {
    const personalizedOnly = req.query.personalized === "true";
    const rawJobs = await getCachedJobs(fetchExternalJobs);
    const normalizedJobs = normalizeJobs(rawJobs);

    const jobsWithDetails = await Promise.all(
      normalizedJobs.map(async (job) => {
        try {
          const scrapedDetails = await getCachedJobDetails(job.applyLink, () =>
            scrapeJobDetails(job.applyLink)
          );

          return {
            ...job,
            ...scrapedDetails,
            title: scrapedDetails.title || job.title,
            applyLink: scrapedDetails.applyOnlineLink || job.applyLink,
            sourceLink: job.applyLink,
          };
        } catch (scrapeError) {
          console.error(
            `Failed to scrape job details for ${job.applyLink}`,
            scrapeError.message
          );

          return {
            ...job,
            sourceLink: job.applyLink,
            organization: "",
            postDate: "",
            shortInformation: "",
            importantDates: [],
            applicationFee: [],
            ageLimit: [],
            totalVacancies: "",
            qualification: [],
            officialWebsite: "",
            notificationLink: "",
            tags: [],
            scrapedAt: null,
          };
        }
      })
    );

    const jobs = personalizedOnly
      ? personalizeJobs(jobsWithDetails, req.user).filter(
          (job) => job.personalizationScore > 0
        )
      : jobsWithDetails;

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

export default router;
