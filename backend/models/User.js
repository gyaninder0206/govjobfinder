import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      trim: true,
    },
    qualification: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: profileSchema,
      default: null,
    },
    savedJobs: [
      {
        title: {
          type: String,
          required: true,
        },
        lastDate: {
          type: String,
          default: "Not specified",
        },
        applyLink: {
          type: String,
          required: true,
        },
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
