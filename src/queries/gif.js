
const postGifQuery = `
INSERT INTO gifs 
(title, user_id, gif_url)
VALUES ($1, $2, $3) returning * 
`;
const findGifByIdQuery = 'SELECT * FROM gifs WHERE gif_id = $1';

const deleteGifQuery = 'DELETE FROM gifs WHERE gif_id = $1';

const commentGifQuery = `
INSERT INTO comments(
  user_id, comment, gif_id
  )
  VALUES($1, $2, $3) returning *
`;

module.exports = {
  postGifQuery,
  deleteGifQuery,
  findGifByIdQuery,
  commentGifQuery,
};
