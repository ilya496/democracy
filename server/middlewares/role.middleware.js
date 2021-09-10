const ApiError = require("../exceptions/api.error");

module.exports = function (roles) {
  return async (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const { roles: userRoles } = req.user;
      console.log(req.user);

      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) hasRole = true;
      });

      if (!hasRole) {
        next(ApiError.ForbiddenError());
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};
