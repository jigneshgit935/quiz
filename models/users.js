import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    otp: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Default status
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
