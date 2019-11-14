
const {
  gettUserId, searchAtrribute, validateInputsFields, formatData,
} = require('../utils');
const db = require('../db');
const {
  flagcommentQuery, findCommentByIdQuery,
} = require('../queries');

require('dotenv').config();

const flagComment = async (req, res) => {
  try {
    const fields = {
      flag: req.body.flag,
    };

    validateInputsFields(fields, 'flag');

    const commentId = parseInt(req.params.commentId, 10);

    const userId = await gettUserId(req);

    const result = await db.query(findCommentByIdQuery, [commentId]);

    const comment = await searchAtrribute(result, 'comment');

    const value = [userId, fields.flag, commentId];

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
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error,
    });
  }
};

module.exports = {
  flagComment,
};
