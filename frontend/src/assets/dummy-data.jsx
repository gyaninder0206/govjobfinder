import { BellIcon, UploadIcon, ZapIcon } from "lucide-react";

/* ================= FEATURES ================= */

export const featuresData = [
  {
    icon: <ZapIcon className="w-6 h-6 text-indigo-400" />,
    title: "Candidate Profile Management",
    desc: "Collects and manages candidate details such as education, skills, experience, and personal information.",
  },
  {
    icon: <UploadIcon className="w-6 h-6 text-indigo-400" />,
    title: "Resume Analysis",
    desc: "Analyzes uploaded resumes to extract relevant qualifications and skills for accurate job matching.",
  },
  {
    icon: <BellIcon className="w-6 h-6 text-indigo-400" />,
    title: "Job Alerts & Updates",
    desc: "Notifies candidates about new job openings and deadlines relevant to their profile.",
  },
];

/* ================= PLANS ================= */

export const plansData = [
  {
    id: "starter",
    name: "Free",
    price: "₹0",
    desc: "Best for students and beginners exploring government job opportunities.",
    credits: "Basic access",
    features: [
      "Create candidate profile",
      "Browse government job listings",
      "Basic eligibility check",
      "Limited job recommendations",
      "Email notifications",
    ],
  },
  {
    id: "pro",
    name: "Standard",
    price: "₹199",
    desc: "Ideal for serious government job aspirants.",
    credits: "Monthly",
    features: [
      "Everything in Free",
      "Advanced profile analysis",
      "Personalized job recommendations",
      "Eligibility-based job matching",
      "Resume upload & analysis",
      "Job alerts & notifications",
    ],
    popular: true,
  },
  {
    id: "ultra",
    name: "Premium",
    price: "₹399",
    desc: "For candidates preparing for multiple government exams.",
    credits: "Monthly",
    features: [
      "Everything in Standard",
      "Priority job alerts",
      "Detailed eligibility insights",
      "Deadline reminders",
      "Early access to new features",
    ],
  },
];

/* ================= FAQ ================= */

export const faqData = [
  {
    question: "What is this platform used for?",
    answer:
      "This platform helps candidates discover suitable government job opportunities by analyzing their qualifications, skills, and eligibility criteria.",
  },
  {
    question: "How does the job recommendation system work?",
    answer:
      "The system collects candidate profile details such as education, skills, age, and category, and matches them with eligibility requirements of government job listings.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes, candidates can access basic features like profile creation, job browsing, and eligibility checks for free.",
  },
  {
    question: "Do I need to upload my resume?",
    answer:
      "Uploading a resume is optional, but it helps the system analyze your qualifications more accurately.",
  },
  {
    question: "Are the government job listings reliable?",
    answer:
      "Yes, job listings are sourced from official and trusted government portals.",
  },
];

/* ================= FOOTER ================= */

export const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "Home", url: "/" },
      { name: "Features", url: "#features" },
      { name: "Job Recommendations", url: "#" },
      { name: "FAQ", url: "#faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Government Job Listings", url: "#" },
      { name: "Eligibility Criteria", url: "#" },
      { name: "Exam Notifications", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "#" },
      { name: "Terms & Conditions", url: "#" },
    ],
  },
];
