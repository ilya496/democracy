const userService = require("../services/user.service");

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
  async getOnlineUsers(req, res, next) {
    try {
      const users = await userService.getOnlineUsers();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
