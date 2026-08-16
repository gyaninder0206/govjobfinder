import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiUrl } from "../utils/api";
import { isSameJob } from "../utils/savedJobs";

export default function Jobs({ user, savedJobs, onToggleSaveJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const isPersonalizedView = searchParams.get("personalized") === "true";

  useEffect(() => {
    setLoading(true);

    const query = isPersonalizedView ? "?personalized=true" : "";

    fetch(apiUrl(`/api/jobs${query}`), {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isPersonalizedView]);

  function showAllJobs() {
    setSearchParams({});
  }

  function showPersonalizedJobs() {
    setSearchParams({ personalized: "true" });
  }

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-400">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            {isPersonalizedView ? "Personalized Jobs" : "Latest Government Jobs"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            {isPersonalizedView
              ? "These jobs are filtered and ranked using the profile details saved in your account."
              : "Browse every available job listing and save the ones you want to revisit later."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={showAllJobs}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !isPersonalizedView
                ? "bg-indigo-600 text-white"
                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Find Jobs
          </button>
          <button
            type="button"
            onClick={showPersonalizedJobs}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isPersonalizedView
                ? "bg-emerald-600 text-white"
                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Personalized Jobs
          </button>
        </div>
      </div>

      {isPersonalizedView && !user ? (
        <div className="mb-8 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
          Sign in and complete your profile to see personalized job matches.
        </div>
      ) : null}

      {isPersonalizedView && user && !user.profile ? (
        <div className="mb-8 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
          Complete your profile first so we can personalize jobs using your qualification, state, and category.
        </div>
      ) : null}

      {isPersonalizedView && jobs.length === 0 && user?.profile ? (
        <div className="mb-8 rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-8 text-sm text-gray-300">
          No personalized matches were found yet. Try updating your profile details or switch back to all jobs.
        </div>
      ) : null}

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
                  {job.organization ? (
                    <p className="text-sm text-indigo-300">
                      {job.organization}
                    </p>
                  ) : null}
                  <p className="text-sm text-gray-400">
                    Last Date: {job.lastDate}
                  </p>
                  {job.totalVacancies ? (
                    <p className="text-sm text-gray-400">
                      Vacancies: {job.totalVacancies}
                    </p>
                  ) : null}
                  {job.qualification?.length ? (
                    <p className="mt-2 text-sm text-gray-300">
                      Qualification: {job.qualification.slice(0, 2).join(" | ")}
                    </p>
                  ) : null}
                  {isPersonalizedView && job.personalizationScore > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        Match Score: {job.personalizationScore}
                      </span>
                      {job.personalizationReasons?.map((reason) => (
                        <span
                          key={reason}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  ) : null}
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
