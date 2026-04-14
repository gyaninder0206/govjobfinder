import { apiUrl } from "./api";

export function getJobId(job) {
  return job.applyLink || `${job.title}-${job.lastDate}`;
}

export function isSameJob(firstJob, secondJob) {
  return getJobId(firstJob) === getJobId(secondJob);
}

export async function fetchSavedJobs() {
  const response = await fetch(apiUrl("/api/saved-jobs"), {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch saved jobs");
  }

  return response.json();
}

export async function saveJob(job) {
  const response = await fetch(apiUrl("/api/saved-jobs"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to save job");
  }

  return response.json();
}

export async function removeSavedJob(job) {
  const response = await fetch(apiUrl("/api/saved-jobs"), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to remove saved job");
  }

  return response.json();
}
