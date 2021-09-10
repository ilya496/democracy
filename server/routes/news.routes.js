const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { body } = require("express-validator");
const {
  create,
  getAll,
  edit,
  delete: deleteArticle,
} = require("../controllers/article.controller");
const router = express.Router();

router.post(
  "/public",
  authMiddleware,
  body("title", "Title should be between 3 and 40 characters").isLength({
    min: 3,
    max: 40,
  }),
  body("content", "Content should be between 5 and 255 characters").isLength({
    min: 5,
    max: 255,
  }),
  create
);
router.patch("/:id/edit", authMiddleware, edit);
router.delete("/:id/delete", authMiddleware, deleteArticle);
router.get("/all", getAll);

module.exports = router;
