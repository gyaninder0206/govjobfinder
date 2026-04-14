import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from "lucide-react";
import { PrimaryButton, GhostButton } from "./Buttons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home({ user }) {
  const navigate = useNavigate();
  const trustedUserImages = [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
  ];

  const mainImageUrl =
    "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1600&auto=format&fit=crop";

  const galleryStripImages = [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=100",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=100",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=100",
  ];

  const trustedLogosText = [
    "Job Aspirants",
    "Fresh Graduates",
    "Government Exams",
    "Public Sector Jobs",
    "Career Seekers",
  ];

  return (
    <>
      <section id="home" className="relative z-10">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 pt-32">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* LEFT */}
            <div className="text-left">
              <motion.div
                className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-3 pr-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <div className="flex -space-x-2">
                  {trustedUserImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="h-6 w-6 rounded-full border border-black/50"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-200/90">
                  Trusted by people across the country
                </span>
              </motion.div>

              <motion.h1
                className="mb-6 max-w-xl text-4xl font-bold leading-tight md:text-5xl"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 110 }}
              >
                Find your dream
                <br />
                <span className="bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text text-transparent">
                  government job
                </span>
              </motion.h1>

              <motion.p
                className="mb-8 max-w-lg text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                Find government jobs that match your education, skills, and
                profile — all in one place, personalized just for you.
              </motion.p>

              <motion.div
                className="mb-8 flex flex-col items-center gap-4 sm:flex-row"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 90, delay: 0.2 }}
              >
                <PrimaryButton
                  className="w-full px-7 py-3 sm:w-auto"
                  onClick={() => {
                    if (!user) {
                      alert("Please login first");
                      return;
                    }
                    navigate("/jobs");
                  }}
                >
                  Find a job <ArrowRightIcon className="h-4 w-4" />
                </PrimaryButton>

                {/* <GhostButton className="w-full px-5 py-3 sm:w-auto">
                  <PlayIcon className="h-4 w-4" />
                  View our work
                </GhostButton> */}
              </motion.div>

              <motion.div
                className="flex flex-col rounded bg-white/10 text-sm text-gray-200 sm:flex-row"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 90 }}
              >
                <div className="flex items-center gap-2 p-3 transition-colors hover:bg-white/10">
                  <ZapIcon className="h-4 w-4 text-sky-500" />
                  <div>
                    <div>Personalized Job Recommendations</div>
                    <div className="text-xs text-gray-400">
                      Based on your qualifications & resume
                    </div>
                  </div>
                </div>

                <div className="hidden w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-2 p-3 transition-colors hover:bg-white/10">
                  <CheckIcon className="h-4 w-4 text-cyan-500" />
                  <div>
                    <div>Eligibility-Based Government Jobs</div>
                    <div className="text-xs text-gray-400">
                      Only jobs you are eligible for
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <motion.div
              className="mx-auto w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src={mainImageUrl}
                  alt="platform-preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                {galleryStripImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 100 + i * 10,
                    }}
                    className="h-10 w-14 overflow-hidden rounded-lg border border-white/10"
                  >
                    <img
                      src={src}
                      alt="thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <motion.section
        className="border-y border-white/10 bg-white/5"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <div className="mx-auto max-w-6xl overflow-hidden px-6 py-6">
          <div className="flex animate-marquee items-center gap-14 whitespace-nowrap">
            {trustedLogosText.concat(trustedLogosText).map((logo, i) => (
              <span
                key={i}
                className="mx-6 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-300"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
