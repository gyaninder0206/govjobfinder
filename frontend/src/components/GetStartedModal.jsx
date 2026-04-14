import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import CreateProfileForm from "./CreateProfileForm";
import UploadResumeModal from "./UploadResumeModal";


export default function GetStartedModal({ open, onClose, user, onProfileSaved }) {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] py-50">
          {/* BACKDROP (click here closes) */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-full max-w-md rounded-2xl bg-gray-900 p-6 border border-white/10"
              onClick={(e) => e.stopPropagation()} // 👈 prevents closing when clicking inside
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <XIcon />
              </button>

              <h2 className="mb-2 text-2xl font-semibold text-white">
                Get Started
              </h2>

              <p className="mb-6 text-sm text-gray-400">
                Create your profile to get personalized government job
                recommendations.
              </p>
              <button
                onClick={() => setShowProfileForm(true)}
                className="mb-3 w-full rounded-full bg-indigo-600 py-2 font-medium hover:bg-indigo-700 transition"
              >
                {user?.profile ? "Update Profile" : "Create Profile"}
              </button>
              {showProfileForm && (
                <CreateProfileForm
                  user={user}
                  onClose={() => setShowProfileForm(false)}
                  onProfileSaved={onProfileSaved}
                />
              )}

              <button
                onClick={() => setShowUpload(true)}
                className="mb-3 w-full rounded-full bg-indigo-600 py-2 font-medium hover:bg-indigo-700 transition"
              >
                Upload Resume
              </button>
              {showUpload && (
                <UploadResumeModal onClose={() => setShowUpload(false)} />
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
