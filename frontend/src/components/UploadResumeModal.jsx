import { useState } from "react";
import { X, UploadCloud, CheckCircle } from "lucide-react";

export default function UploadResumeModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  }

  function handleUpload(e) {
    e.preventDefault();

    if (!file) return;

    // simulate upload
    localStorage.setItem(
      "userResume",
      JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type,
      })
    );

    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 2000);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-50">
      <div className="relative w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <CheckCircle className="mb-4 h-14 w-14 text-green-500" />
            <h2 className="text-xl font-semibold text-white">
              Resume Uploaded Successfully
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              We’ll use it to personalize job recommendations.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="px-6 py-8 space-y-6">
            <h2 className="text-lg font-semibold text-white">
              Upload Your Resume
            </h2>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center hover:border-indigo-500 transition">
              <UploadCloud className="mb-3 h-10 w-10 text-indigo-400" />
              <p className="text-sm text-gray-300">
                {file ? file.name : "Click to upload or drag & drop"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOC, DOCX (max 5MB)
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={!file}
              className="w-full rounded-full bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-40 transition"
            >
              Upload Resume
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
