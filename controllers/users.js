const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

const createUser = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashPassword);

  let newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashPassword,
    role: req.body.role,
  });
  res.json({ message: "User created", data: newUser });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "This is not your profile" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong! Try again later" });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted", user });
  // const user = await User.findByIdAndDelete(req.params.id);
  // res.json({ message: 'User deleted', user})
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
