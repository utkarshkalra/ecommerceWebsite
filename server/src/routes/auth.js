const express = require("express");
const { signup, signin, profile } = require("../controller/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
  requireSignin,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/profile", requireSignin, profile);

module.exports = router;
