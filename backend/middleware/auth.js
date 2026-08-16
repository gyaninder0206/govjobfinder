import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function resolveUserFromToken(token) {
  if (!token) {
    return null;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(decoded.id);
}

export async function requireAuth(req, res, next) {
  try {
    const user = await resolveUserFromToken(req.cookies.token);
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export async function attachUserIfPresent(req, _res, next) {
  try {
    req.user = await resolveUserFromToken(req.cookies.token);
    next();
  } catch {
    req.user = null;
    next();
  }
}
