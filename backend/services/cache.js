let cachedJobs = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const jobDetailsCache = new Map();
const JOB_DETAILS_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export async function getCachedJobs(fetchFn) {
  const now = Date.now();

  if (cachedJobs && now - lastFetchTime < CACHE_DURATION) {
    console.log("🟢 Serving jobs from cache");
    return cachedJobs;
  }

  console.log("🔴 Fetching jobs from RapidAPI");
  const data = await fetchFn();

  cachedJobs = data;
  lastFetchTime = now;

  return data;
}

export async function getCachedJobDetails(cacheKey, fetchFn) {
  const now = Date.now();
  const cachedEntry = jobDetailsCache.get(cacheKey);

  if (
    cachedEntry &&
    now - cachedEntry.timestamp < JOB_DETAILS_CACHE_DURATION
  ) {
    return cachedEntry.data;
  }

  const data = await fetchFn();
  jobDetailsCache.set(cacheKey, {
    data,
    timestamp: now,
  });

  return data;
}
