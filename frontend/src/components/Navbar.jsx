import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  LogOutIcon,
  HeartIcon,
} from "lucide-react";
import { PrimaryButton } from "./Buttons";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import GetStartedModal from "./GetStartedModal";
import { apiUrl } from "../utils/api";

export default function Navbar({ user, setUser, savedJobsCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/#" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "U";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(apiUrl("/api/auth/logout"), {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setShowProfileMenu(false);
      setIsOpen(false);
      setToast({ message: "Logout successful", type: "success" });
      navigate("/");
    } catch {
      console.error("Logout failed");
      setToast({ message: "Logout failed. Please try again.", type: "error" });
    }
  };

  useEffect(() => {
    if (!toast.message) {
      return;
    }

    const timer = setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSavedJobsClick = () => {
    setShowProfileMenu(false);
    setIsOpen(false);
    navigate("/saved-jobs");
  };

  return (
    <>
      {toast.message && (
        <div
          className={`fixed right-4 top-4 z-[120] rounded-lg border px-4 py-2 text-sm shadow-xl backdrop-blur ${
            toast.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
              : "border-rose-400/30 bg-rose-500/15 text-rose-200"
          }`}
        >
          {toast.message}
        </div>
      )}

      <motion.nav
        className="fixed inset-x-0 top-5 z-50 px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-md">
          <a href="/#" className="shrink-0">
            <img
              src="/logo-professional.svg"
              alt="GovJob Finder"
              className="h-14 w-auto sm:h-16"
            />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                href={link.href}
                key={link.name}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-2 py-1 pr-4 text-sm text-white transition hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40">
                    {userInitials}
                  </span>
                  <span className="max-w-[120px] truncate text-sm font-medium text-gray-100">
                    {user.name}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-300" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#0f1118] p-3 shadow-2xl">
                    <div className="mb-3 rounded-lg bg-white/5 p-3">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="mt-1 text-xs text-gray-400">{user.email}</p>
                    </div>

                    <button
                      onClick={handleSavedJobsClick}
                      className="mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-white/10"
                    >
                      <span className="flex items-center gap-2">
                        <HeartIcon className="h-4 w-4" />
                        Saved Jobs
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-300">
                        {savedJobsCount}
                      </span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-white/10"
                    >
                      <LogOutIcon className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign in
              </button>
            )}

            <PrimaryButton
              onClick={() => {
                if (!user) {
                  setShowLogin(true);
                } else {
                  setShowGetStarted(true);
                }
              }}
            >
              Get Started
            </PrimaryButton>
          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/40 backdrop-blur-md text-lg font-medium transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {user ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {userInitials}
              </div>
              <p className="text-base text-white">{user.name}</p>
              <p className="-mt-2 text-sm text-gray-300">{user.email}</p>
              <button
                onClick={handleSavedJobsClick}
                className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                <HeartIcon className="h-4 w-4" />
                Saved Jobs ({savedJobsCount})
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogin(true);
              }}
              className="hover:text-white transition-colors"
            >
              Sign in
            </button>
          )}

          <PrimaryButton
            onClick={() => {
              setIsOpen(false);
              if (!user) {
                setShowLogin(true);
              } else {
                setShowGetStarted(true);
              }
            }}
          >
            Get Started
          </PrimaryButton>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-white p-2 text-gray-800 active:scale-95 transition"
          >
            <XIcon />
          </button>
        </div>
      </motion.nav>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(userData) => setUser(userData)}
      />

      <GetStartedModal
        open={showGetStarted}
        onClose={() => setShowGetStarted(false)}
        user={user}
        onProfileSaved={setUser}
      />
    </>
  );
}
