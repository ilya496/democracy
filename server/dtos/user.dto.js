module.exports = class UserDto {
  email;
  id;
  username;
  roles;
  isOnline;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.id = model._id;
    this.roles = model.roles;
    this.isOnline = model.isOnline;
  }
};
