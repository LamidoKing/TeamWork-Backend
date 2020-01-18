const bcrypt = require('bcrypt');
const db = require('./db');
const { findUserQuery } = require('./queries');
const { BadRequest, Unauthorize } = require('./errors');

require('dotenv').config();

const findUser = async (email) => {
  const err = 'invalid email check and try again';

  const { rows } = await db.query(findUserQuery, [email]);

  if (rows.length > 0) {
    throw new BadRequest(err);
  }

  return email;
};

const attemptSignIn = async (email, password) => {
  const err = 'Invalid Email or Password';

  const { rows } = await db.query(findUserQuery, [email]);

  if (!rows[0]) {
    throw new Unauthorize(err);
  }
  const valid = await bcrypt.compare(password, rows[0].password);

  if (!valid) {
    throw new Unauthorize(err);
  }

  return rows[0];
};

const searchAtrribute = async (result, name) => {
  const err = {
    noattr: `${name} doent exist`,
  };

  if (!result.rows[0]) {
    throw new BadRequest(err.noattr);
  }
  return result.rows[0];
};

module.exports = {
  findUser,
  attemptSignIn,
  searchAtrribute,
};
