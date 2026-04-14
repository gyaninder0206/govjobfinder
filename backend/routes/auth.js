import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function sanitizeUser(user) {
  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
}

// 🟢 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// 🔵 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, getCookieOptions())
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// 🔴 LOGOUT
router.post("/logout", (req, res) => {
  res
      .clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .json({ message: "Logged out successfully" });
});

router.get("/me", requireAuth, async (req, res) => {
  res.json(sanitizeUser(req.user));
});

router.put("/profile", requireAuth, async (req, res) => {
  try {
    const hadProfile = Boolean(req.user.profile);
    const {
      name,
      email,
      age,
      gender,
      qualification,
      category,
      state,
      phone,
    } = req.body;

    if (
      !name ||
      !email ||
      age === undefined ||
      !gender ||
      !qualification ||
      !category ||
      !state ||
      !phone
    ) {
      return res.status(400).json({ message: "All profile fields are required" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({
      email: trimmedEmail,
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    req.user.name = name.trim();
    req.user.email = trimmedEmail;
    req.user.profile = {
      age: Number(age),
      gender: gender.trim(),
      qualification: qualification.trim(),
      category: category.trim(),
      state: state.trim(),
      phone: phone.trim(),
    };

    await req.user.save();

    res.json({
      message: hadProfile ? "Profile updated successfully" : "Profile saved successfully",
      user: sanitizeUser(req.user),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save profile" });
  }
});

export default router;
