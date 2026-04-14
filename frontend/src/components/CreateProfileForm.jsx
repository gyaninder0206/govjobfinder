import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiUrl } from "../utils/api";

const initialFormData = {
  name: "",
  age: "",
  gender: "",
  qualification: "",
  category: "",
  state: "",
  email: "",
  phone: "",
};

export default function CreateProfileForm({ user, onClose, onProfileSaved }) {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setFormData(initialFormData);
      return;
    }

    setFormData({
      name: user.name || "",
      age: user.profile?.age ? String(user.profile.age) : "",
      gender: user.profile?.gender || "",
      qualification: user.profile?.qualification || "",
      category: user.profile?.category || "",
      state: user.profile?.state || "",
      email: user.email || "",
      phone: user.profile?.phone || "",
    });
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(apiUrl("/api/auth/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to save profile");
        return;
      }

      onProfileSaved?.(data.user);
      setMessage(data.message || "Profile saved successfully");

      setTimeout(() => {
        onClose();
      }, 900);
    } catch {
      setError("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  }

  const isUpdating = Boolean(user?.profile);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {isUpdating ? "Update Your Profile" : "Create Your Profile"}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Save your details to keep your account profile up to date.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] space-y-4 overflow-y-auto px-6 py-5"
        >
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              name="age"
              type="number"
              min="1"
              value={formData.age}
              onChange={handleChange}
            />

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
            />
          </div>

          <Input
            label="Highest Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={["General", "OBC", "SC", "ST"]}
            />
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Mobile Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {message ? (
            <p className="text-sm text-emerald-400">{message}</p>
          ) : null}

          {error ? (
            <p className="text-sm text-rose-400">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSaving}
            className="mt-4 w-full rounded-full bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSaving
              ? "Saving..."
              : isUpdating
                ? "Update Profile"
                : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-400">{label}</label>
      <input
        {...props}
        required
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-indigo-500"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-400">{label}</label>
      <select
        {...props}
        required
        className="w-full rounded-lg border border-white/10 bg-gray-900 px-4 py-2 text-white outline-none focus:border-indigo-500"
      >
        <option value="" className="text-gray-400">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-gray-900 text-white"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
