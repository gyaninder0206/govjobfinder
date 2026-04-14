import { XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { apiUrl } from "../utils/api";

export default function LoginModal({ open, onClose, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isSignup) {
        // 🔵 SIGNUP
        const res = await fetch(apiUrl("/api/auth/signup"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message);
          return;
        }

        setMessage("Signup successful! Please login.");
        setIsSignup(false);
        setName("");
        setEmail("");
        setPassword("");
        return;
      }

      // 🟢 LOGIN
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      // Fetch user
      const userRes = await fetch(apiUrl("/api/auth/me"), {
        credentials: "include",
      });

      const user = await userRes.json();

      onLogin(user);
      onClose();
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-xl border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <XIcon />
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-white">
          {isSignup ? "Create an account" : "Sign in to your account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.includes("successful")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-600 py-2 font-medium hover:bg-indigo-700 transition"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage("");
            }}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            {isSignup ? "Sign in" : "Sign up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
