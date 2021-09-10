module.exports = class ArticleDto {
  title;
  content;
  author;
  createdAt;
  id;
  published;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.content = model.content;
    this.createdAt = model.createdAt;
    this.author = model.author;
    this.published = model.published;
  }
};
