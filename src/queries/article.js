
const postArticleQuery = `
INSERT INTO gifs 
(title, user_id, article)
VALUES ($1, $2, $3) returning * 
`;


module.exports = {
  postArticleQuery,
};
