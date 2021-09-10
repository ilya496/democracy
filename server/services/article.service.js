const Article = require("../models/Article");
const ApiError = require("../exceptions/api.error");
const ArticleDto = require("../dtos/article.dto");

class ArticleService {
  async create(title, content, author) {
    let article = await Article.findOne({ content });
    if (article) {
      throw ApiError.BadRequest("Each article should have its own content");
    }
    article = await Article.create({
      title,
      content,
      author: author,
    });
    const articleData = new ArticleDto(article);
    return articleData;
  }
  async edit(id, editedArticle, currentUser) {
    const article = await Article.findById(id);
    if (!article) {
      throw ApiError.BadRequest("Wrong article ID for editing");
    }
    if (JSON.stringify(article.author) != JSON.stringify(currentUser)) {
      throw ApiError.UnauthorizedError();
    }
    article.title = editedArticle.title;
    article.content = editedArticle.content;
    await article.save();
    return new ArticleDto(article);
  }
  async delete(id) {
    const article = await Article.findById(id);
    if (!article) {
      throw ApiError.BadRequest("Wrong article ID for deleting");
    }
    const deletedArticle = await Article.deleteOne({ _id: id });
    return deletedArticle;
  }
  async getAll() {
    let articles = await Article.find();
    articles = articles.map((article) => new ArticleDto(article));
    return articles;
  }
  async public(id) {
    const article = await Article.findById(id);
    if (!article) {
      throw ApiError.BadRequest("Wrong article ID for publishing");
    }
    article.published = true;
    await article.save();
    return article;
  }
}

module.exports = new ArticleService();
