
const postArticleQuery = `
INSERT INTO articles 
(title, user_id, article)
VALUES ($1, $2, $3) returning * 
`;

const editArticleQuery = 'UPDATE articles SET title = $1, article = $2 WHERE article_id = $3 returning *';

const findArticleByIdQuery = 'SELECT * FROM articles WHERE article_id = $1';

const deleteArticleQuery = 'DELETE FROM articles WHERE article_id = $1';

const commentArticleQuery = `
INSERT INTO comments(
  user_id, comment, article_id
  )
  VALUES($1, $2, $3) returning *
`;

module.exports = {
  postArticleQuery,
  editArticleQuery,
  findArticleByIdQuery,
  deleteArticleQuery,
  commentArticleQuery,
};