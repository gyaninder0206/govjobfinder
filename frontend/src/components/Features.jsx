import { useRef } from "react";
import { featuresData } from "../assets/dummy-data";
import Title from "./Title";
import { motion } from "framer-motion";

export default function Features() {
  const refs = useRef([]);

  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Title
          title="Features"
          heading="Everything you need to find the right government job"
          description="Our platform analyzes your profile, qualifications, skills, and resume to deliver personalized government job recommendations based on eligibility."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuresData.map((feature, i) => (
            <motion.div
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120 + i * 10,
              }}
              onAnimationComplete={() => {
                const card = refs.current[i];
                if (card) {
                  card.classList.add(
                    "transition",
                    "duration-300",
                    "hover:-translate-y-1"
                  );
                }
              }}
              className="
                rounded-2xl p-6
                bg-white/5
                border border-white/10
              "
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-900/20">
                {feature.icon}
              </div>

              <h3 className="mb-2 text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
