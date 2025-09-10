const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }

  const matchPassword = await bcrypt.compare(
    req.body.password,
    foundUser.password
  );
  if (!matchPassword) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }

  const token = jwt.sign(
    { id: foundUser.id, email: foundUser.email },
    process.env.JWT_SECRET
  );
  res.status(200).json({ message: "User logged in", token });
};

exports.login = login;
