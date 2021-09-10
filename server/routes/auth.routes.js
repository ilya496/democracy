const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  login,
  logout,
  refresh,
  registrate,
  autoLogin,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/registrate",
  body(
    "username",
    "Bad credentials, login should consist only letters and numbers"
  ).exists(),
  body("email", "Bad credentials, please write email").isEmail(),
  body("password", "Password is too weak").matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
    "i"
  ),
  registrate
);
router.post("/login", login);
router.post("/auto", authMiddleware, autoLogin);
router.post("/logout", authMiddleware, logout);
router.get("/refresh", refresh);

module.exports = router;
