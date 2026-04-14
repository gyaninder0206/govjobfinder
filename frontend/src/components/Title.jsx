import { motion } from "framer-motion";

export default function Title({ title, heading, description }) {
  return (
    <div className="mb-16 text-center">
      {title && (
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-wide text-violet-400"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {title}
        </motion.p>
      )}

      {heading && (
        <motion.h2
          className="text-2xl font-semibold text-white md:text-4xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 110 }}
        >
          {heading}
        </motion.h2>
      )}

      {description && (
        <motion.p
          className="mx-auto my-3 max-w-md text-sm text-gray-400"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
