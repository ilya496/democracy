const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const authService = require("../services/auth.service");

class AuthController {
  async registrate(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return next(
          ApiError.BadRequest("Bad credentials - validation", errors.array())
        );
      }
      const { username, email, password } = req.body;
      const userData = await authService.registrate(username, email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async autoLogin(req, res, next) {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
