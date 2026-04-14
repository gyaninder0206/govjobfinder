let cachedJobs = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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
