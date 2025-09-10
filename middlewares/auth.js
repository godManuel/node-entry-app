const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  // let token;

  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized!" });
    console.log(error);
  }

  let token;

  // Step 1: Check if the token is present in the headers

  if (
    req.headers.authorization ||
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Step 2: Extract the token from the header
    token = req.headers.authorization.split(" ")[1];
  }

  // Step 3: If token is not present, return 401 not authorized
  if (!token) {
    return res.status(401).json({ message: "Not authorized!" });
  }

  try {
    // Step 4: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Wrong token!" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Not allowed to perform this action" });
    }
    next();
  };
};

exports.protect = protect;
exports.authorize = authorize;
