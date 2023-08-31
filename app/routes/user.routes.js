const express = require("express");
const router = express.Router();
const {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUserById,
} = require("../controllers/user.controller");

router.get("/", findAllUsers);

router.get("/:id", findUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUserById);

module.exports = router;
