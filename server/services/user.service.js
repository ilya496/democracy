const User = require("../models/User");

class UserService {
  async getOnlineUsers() {
    const users = await User.find({ isOnline: true });
    return users;
  }
  async getAll() {
    const users = await User.find();
    return users;
  }
}

module.exports = new UserService();
