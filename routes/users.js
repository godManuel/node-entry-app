const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/users.js");

const { protect, authorize } = require("../middlewares/auth.js");

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", protect, getUser);

router.put("/:id", updateUser);

router.delete("/:id", protect, authorize("admin", "superadmin"), deleteUser);

module.exports = router;
