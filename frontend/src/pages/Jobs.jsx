import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { apiUrl } from "../utils/api";
import { isSameJob } from "../utils/savedJobs";

export default function Jobs({ savedJobs, onToggleSaveJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl("/api/jobs"))
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-400">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32">
      <h1 className="mb-6 text-3xl font-semibold">
        Latest Government Jobs
      </h1>
      <p className="mb-8 max-w-2xl text-sm text-gray-400">
        Browse the latest listings and tap the heart icon on any card to save it
        to your personal saved jobs page.
      </p>

      <div className="space-y-4">
        {jobs.map((job, index) => {
          const isSavedJob = savedJobs.some((savedJob) => isSameJob(savedJob, job));

          return (
            <div
              key={job.applyLink || index}
              className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => onToggleSaveJob(job)}
                  aria-label={isSavedJob ? "Remove from saved jobs" : "Save job"}
                  className={`mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isSavedJob
                      ? "border-rose-400/40 bg-rose-500/15 text-rose-400"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-rose-400/30 hover:text-rose-300"
                  }`}
                >
                  <HeartIcon className={`h-4 w-4 ${isSavedJob ? "fill-current" : ""}`} />
                </button>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Last Date: {job.lastDate}
                  </p>
                </div>
              </div>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Apply Now
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
