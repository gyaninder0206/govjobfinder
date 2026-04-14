import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import CTA from "../components/CTA";

import CreateProfileForm from "../components/CreateProfileForm";
import UploadResumeModal from "../components/UploadResumeModal";

export default function Home({ user, setUser }) {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <Hero user={user}/>
      <Features />
      <Pricing />
      <Faq />

      <CTA
        user={user}
        onCreateProfile={() => setShowProfile(true)}
        onUploadResume={() => setShowUpload(true)}
        onGoToJobs={() => navigate("/jobs")}
      />

      {showProfile && (
        <CreateProfileForm
          user={user}
          onClose={() => setShowProfile(false)}
          onProfileSaved={setUser}
        />
      )}

      {showUpload && (
        <UploadResumeModal onClose={() => setShowUpload(false)} />
      )}
    </>
  );
}
