const {
  encrypt, attemptCreateUser, attemptSignIn, getToken, formatData,
} = require('../utils');
const db = require('../db');
const { createUserQuery, findUserQuery } = require('../queries');

require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const {
      admin, firstname, lastname, gender, jobrole, department, address,
    } = req.body;

    const email = await attemptCreateUser(req.body.email, res);

    const password = await encrypt(req.body.password);

    const rolenumber = admin ? process.env.ADMIN : 1;

    const value = [
      email, password, rolenumber, firstname,
      lastname, gender, jobrole, department, address,
    ];

    const rows = await db.query(createUserQuery, value);
    const formatedData = await formatData(rows, 'create-user');

    const token = await getToken(formatedData.userId, rolenumber);

    const data = {
      message: 'User account successfully created',
      token,
      ...formatedData[0],
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

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await db.query(findUserQuery, [email]);

    const user = await attemptSignIn(rows, password);

    const token = await getToken(user.user_id, user.rolenumber);

    const data = {
      token,
      userId: user.user_id,
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
  createUser,
  signIn,
};
