const express = require("express");
const router = express.Router();

const userController = require("../../../../controllers/client/user.controller")
const userValidate = require("../../../../validates/client/user.validate")

router.post(
  "/register",
  userValidate.register,
  userController.register);

router.post(
  "/login",
  userValidate.login,
  userController.login);

module.exports = router;