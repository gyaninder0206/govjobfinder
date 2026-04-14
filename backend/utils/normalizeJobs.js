export function normalizeJobs(apiResponse) {
  // extract the array safely
  const jobsArray = apiResponse.data;

  if (!Array.isArray(jobsArray)) {
    throw new Error("Jobs data is not an array");
  }

  return jobsArray.map((job) => ({
    title: job.title,
    lastDate: job.last_date,
    applyLink: job.link,
  }));
}
