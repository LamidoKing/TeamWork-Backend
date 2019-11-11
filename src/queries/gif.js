
const postGifQuery = `
INSERT INTO gifs 
(title, user_id, gif_url)
VALUES ($1, $2, $3) returning * 
`;


module.exports = {
  postGifQuery,
};
