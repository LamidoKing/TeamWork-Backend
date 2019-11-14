const flagcommentQuery = `
INSERT INTO flags(
  user_id, flag, comment_id
  )
  VALUES($1, $2, $3) returning *
`;

const findCommentByIdQuery = 'SELECT * from comments WHERE comment_id=$1';

module.exports = {
  flagcommentQuery,
  findCommentByIdQuery,
};
