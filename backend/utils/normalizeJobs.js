export function normalizeJobs(apiResponse) {
  const jobsArray = apiResponse.data;

  if (!Array.isArray(jobsArray)) {
    throw new Error("Jobs data is not an array");
  }

  return jobsArray.map((job) => ({
    title: job.title?.trim() || "Untitled job",
    lastDate: job.last_date?.trim() || "Not specified",
    applyLink: job.link?.trim() || "",
  }));
}
