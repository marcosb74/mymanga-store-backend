const express = require("express");
const router = express.Router();
const isAuthenticatedUser = require("../utils/logged");

const {
  signUpController,
  signInController,
  getProfileController,
} = require("../controllers/auth.controller");

router.post("/signup", signUpController);

router.post("/signin", signInController);

router.get("/profile", isAuthenticatedUser, getProfileController);

module.exports = router;
