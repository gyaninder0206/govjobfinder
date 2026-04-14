import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SavedJobs({ savedJobs, onToggleSaveJob }) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Saved Jobs</h1>
          <p className="mt-2 text-sm text-gray-400">
            Keep track of the opportunities you want to revisit before applying.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          {savedJobs.length} saved {savedJobs.length === 1 ? "job" : "jobs"}
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-8 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gray-300">
            <HeartIcon className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            No saved jobs yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Save interesting job listings from the jobs page and they will appear
            here for quick access.
          </p>
          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Explore Jobs
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job, index) => (
            <div
              key={job.applyLink || index}
              className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => onToggleSaveJob(job)}
                  aria-label="Remove from saved jobs"
                  className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/15 text-rose-400 transition hover:bg-rose-500/25"
                >
                  <HeartIcon className="h-4 w-4 fill-current" />
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
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
