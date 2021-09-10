const UserDto = require("../dtos/user.dto");
const ApiError = require("../exceptions/api.error");
const User = require("../models/User");
const tokenService = require("./token.service");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");

class AuthService {
  async registrate(username, email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("User already exists");
    }
    const hashedPassword = bcrypt.hashSync(password, 7);
    let userRole = await Role.findOne({ name: "admin" });
    if (!userRole) {
      userRole = await Role.create({ name: "admin" });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [userRole.name],
      isOnline: true,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(
        `User with email ${email ? email : "''"} does not exist`
      );
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw ApiError.BadRequest("Incorrect password");
    }

    user.isOnline = true;

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    await user.save();
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.findToken(refreshToken);
    const user = await User.findById(token.user);
    await tokenService.removeToken(refreshToken);
    user.isOnline = false;
    await user.save();
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      return ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const dbToken = tokenService.findToken(refreshToken);
    if (!userData || !dbToken) {
      return ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new AuthService();
