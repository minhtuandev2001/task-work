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

router.post(
  "/password/forgot",
  userValidate.forgotPassword,
  userController.forgotPassword);

router.post(
  "/password/otp",
  userValidate.otpPassword,
  userController.otpPassword);

router.post(
  "/password/reset",
  userValidate.resetPassword,
  userController.resetPassword);

module.exports = router;