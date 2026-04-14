import { ChevronDownIcon } from "lucide-react";
import Title from "./Title";
import { faqData } from "../assets/dummy-data";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function Faq() {
  const refs = useRef([]);

  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Title
          title="FAQ"
          heading="Frequently asked questions"
          description="Everything you need to know about using our platform to find personalized government job opportunities."
        />

        <div className="space-y-3">
          {faqData.map((faq, i) => (
            <motion.details
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100 + i * 10,
              }}
              onAnimationComplete={() => {
                const card = refs.current[i];
                if (card) {
                  card.classList.add("transition", "duration-300");
                }
              }}
              className="group rounded-xl bg-white/5 select-none"
            >
              <summary className="flex cursor-pointer items-center justify-between p-4">
                <h4 className="font-medium">{faq.question}</h4>
                <ChevronDownIcon className="h-5 w-5 text-gray-300 transition-transform group-open:rotate-180" />
              </summary>

              <p className="p-4 pt-0 text-sm leading-relaxed text-gray-300">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
