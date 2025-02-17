import mongoose from "mongoose";

const signupSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      email: true,
    },
    phone: {
      type: Number,
      min: 10,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("signup", signupSchema);
