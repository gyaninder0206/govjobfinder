import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import SavedJobs from "./pages/SavedJobs";
import SoftBackdrop from "./components/SoftBackdrop";
import Footer from "./components/Footer";
import LenisScroll from "./components/lenis";
import { apiUrl } from "./utils/api";
import {
  fetchSavedJobs,
  isSameJob,
  removeSavedJob,
  saveJob,
} from "./utils/savedJobs";

function App() {
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(apiUrl("/api/auth/me"), {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const syncSavedJobs = async () => {
      if (!user) {
        setSavedJobs([]);
        return;
      }

      try {
        const jobs = await fetchSavedJobs();
        setSavedJobs(jobs);
      } catch {
        setSavedJobs([]);
      }
    };

    syncSavedJobs();
  }, [user]);

  const toggleSavedJob = async (job) => {
    const isAlreadySaved = savedJobs.some((savedJob) => isSameJob(savedJob, job));

    try {
      const updatedSavedJobs = isAlreadySaved
        ? await removeSavedJob(job)
        : await saveJob(job);

      setSavedJobs(updatedSavedJobs);
    } catch (error) {
      console.error("Failed to update saved jobs", error);
    }
  };

  return (
    <>
      <SoftBackdrop />
      <LenisScroll />

      <Navbar
        user={user}
        setUser={setUser}
        savedJobsCount={savedJobs.length}
      />

      <Routes>
        <Route
          path="/"
          element={<Home user={user} setUser={setUser} />}
        />

        <Route
          path="/jobs"
          element={
            user ? (
              <Jobs
                savedJobs={savedJobs}
                onToggleSaveJob={toggleSavedJob}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/saved-jobs"
          element={
            user ? (
              <SavedJobs
                savedJobs={savedJobs}
                onToggleSaveJob={toggleSavedJob}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
