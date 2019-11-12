
const postArticleQuery = `
INSERT INTO articles 
(title, user_id, article)
VALUES ($1, $2, $3) returning * 
`;

const editArticleQuery = 'UPDATE articles SET title = $1, article = $2 WHERE article_id = $3 returning *';

const findArticleByIdQuery = 'SELECT * FROM articles WHERE article_id = $1';

module.exports = {
  postArticleQuery,
  editArticleQuery,
  findArticleByIdQuery,
};
