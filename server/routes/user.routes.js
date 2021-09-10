const express = require("express");
const { getAll, getOnlineUsers } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.get("/all", getAll);
router.get("/online", authMiddleware, roleMiddleware(["user"]), getOnlineUsers);

module.exports = router;
