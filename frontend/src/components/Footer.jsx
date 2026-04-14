import { footerLinks } from "../assets/dummy-data";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-white/5 border-t border-white/10 pt-10 text-gray-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/10 py-10 md:flex-row">
          <div>
            <img
              src="/logo-professional.svg"
              alt="GovJob Finder"
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-[410px] text-sm leading-relaxed">
              A smart platform designed to help candidates discover suitable
              government job opportunities through profile analysis, eligibility
              checks, and personalized recommendations.
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-5 md:w-[45%]">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {section.title}
                </h3>

                <ul className="space-y-1 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="transition-colors hover:text-white"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-center text-sm text-gray-400">
          ❤️ {new Date().getFullYear()} Made with love by Gyaninder. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
