const route = require("express").Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");
const keyVerification = require("../middleware/keyVerification");

route.post("/register", userController.register);

route.get(
  "/getUserByToken",
  auth.isAuthenticated,
  userController.getUserByToken
);

route.post("/", userController.login);

route.post(
  "/resetPassword",
  auth.isAuthenticated,
  userController.resetPassword
);

// sending password reset link to user
route.post("/forgetPassword", userController.sendPasswordResetLink);

// for verifying password reset link
route.post(
  "/verifyResetLink",
  keyVerification.verifyResetLink,
  userController.verifyPasswordResetLink
);

route.post(
  "/setNewPassword",
  keyVerification.verifyResetLink,
  userController.setNewPassword
);

module.exports = route;
