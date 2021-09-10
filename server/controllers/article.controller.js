const articleService = require("../services/article.service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");

class ArticleController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return next(
          ApiError.BadRequest("Bad data - validation", errors.array())
        );
      }
      const { title, content } = req.body;
      const articleData = await articleService.create(
        title,
        content,
        req.user.id
      );
      res.status(201).json(articleData);
    } catch (e) {
      next(e);
    }
  }
  async edit(req, res, next) {
    try {
      const { clientArticle } = req.body;
      const editedArticle = await articleService.edit(
        req.params.id,
        clientArticle,
        req.user.id
      );
      res.status(200).json(editedArticle);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const article = await articleService.delete(req.params.id);
      res.status(200).json(article);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const articles = await articleService.getAll();
      res.status(200).json(articles);
    } catch (e) {
      next(e);
    }
  }
  async public(req, res, next) {
    try {
      const article = await articleService.public(req.params.id);
      res.status(200).json(article);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArticleController();
