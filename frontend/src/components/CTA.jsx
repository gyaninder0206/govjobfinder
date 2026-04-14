import { ArrowRightIcon } from "lucide-react";
import { GhostButton } from "./Buttons";
import { motion } from "framer-motion";

export default function CTA({
  user,
  onCreateProfile,
  onUploadResume,
  onGoToJobs,
}) {
  function handleCTA() {
    const resume = localStorage.getItem("userResume");

    if (!user?.profile) {
      onCreateProfile();
      return;
    }

    if (!resume) {
      onUploadResume();
      return;
    }

    onGoToJobs();
  }

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <div
          className="
            relative overflow-hidden rounded-3xl
            bg-gradient-to-b from-violet-900/20 to-violet-900/5
            border border-violet-500/20
            p-8 md:p-12
            text-center
          "
        >
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />

          <div className="relative z-10">
            <motion.h2
              className="mb-6 text-2xl sm:text-4xl font-semibold"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              Ready to find the right government job for you?
            </motion.h2>

            <motion.p
              className="mx-auto mb-10 max-w-xl text-sm sm:text-base text-slate-400"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              Create your profile, upload your resume, and get personalized
              government job recommendations based on your qualifications and
              eligibility.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 90, delay: 0.3 }}
            >
              <GhostButton
                onClick={handleCTA}
                className="px-8 py-3 gap-2"
              >
                Personalized job recommendations
                <ArrowRightIcon size={20} />
              </GhostButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
