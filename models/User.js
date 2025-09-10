const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: [4, "Name is less than 4 characters"],
    required: [true, "First name is required"],
    maxlength: [255, "Name is more than 255 characters"],
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long"],
    required: true,
    // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number']
  },
  phone: String,
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  isSubscribed: {
    type: Boolean,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
