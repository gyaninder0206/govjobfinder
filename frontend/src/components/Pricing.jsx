import { Check } from "lucide-react";
import { PrimaryButton, GhostButton } from "./Buttons";
import Title from "./Title";
import { plansData } from "../assets/dummy-data";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Pricing() {
  const refs = useRef([]);

  return (
    <section
      id="pricing"
      className="border-t border-white/10 bg-white/5 py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <Title
          title="Plans"
          heading="Affordable plans for every job aspirant"
          description="Choose a plan that fits your needs and get personalized government job recommendations based on your profile and eligibility."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plansData.map((plan, i) => (
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
              className={`relative rounded-xl border p-6 backdrop-blur ${
                plan.popular
                  ? "border-indigo-500/50 bg-indigo-900/30"
                  : "border-white/10 bg-indigo-950/30"
              }`}
            >
              {plan.popular && (
                <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-indigo-600 px-3 py-1 text-xs">
                  Most popular
                </p>
              )}

              <div className="mb-6">
                <p className="text-sm">{plan.name}</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-400">
                    / {plan.credits}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  {plan.desc}
                </p>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <Check className="h-4 w-4 text-indigo-400" />
                    {feat}
                  </li>
                ))}
              </ul>

              <div>
                {plan.popular ? (
                  <PrimaryButton className="w-full">
                    Get started
                  </PrimaryButton>
                ) : (
                  <GhostButton className="w-full justify-center">
                    Get started
                  </GhostButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
