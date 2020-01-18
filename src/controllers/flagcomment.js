
const { formatData, gettUserId } = require('../utils');
const { searchAtrribute } = require('../auth');
const db = require('../db');
const {
  flagcommentQuery, findCommentByIdQuery,
} = require('../queries');
const {
  commentIdShema,
  flagShema,
  validate,
} = require('../validation');

require('dotenv').config();

const flagComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);

  await validate(commentIdShema, { commentId });

  await validate(flagShema, req.body);

  const fields = req.body.flag;

  const userId = await gettUserId(req);

  const result = await db.query(findCommentByIdQuery, [commentId]);

  const comment = await searchAtrribute(result, 'comment');

  const value = [userId, fields, commentId];

  const flag = await db.query(flagcommentQuery, value);

  const formatedFlag = await formatData(flag, 'flag');

  const data = {
    message: 'comment flag  successfully',
    ...formatedFlag[0],
    commentId: comment.comment_id,
    comment: comment.comment,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

module.exports = {
  flagComment,
};
