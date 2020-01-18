const { attemptSignIn, findUser } = require('../auth');
const {
  encrypt, formatData, getToken,
} = require('../utils');
const db = require('../db');
const { createUserQuery } = require('../queries');
const { createUserSchema, signInSchema, validate } = require('../validation');

require('dotenv').config();

const createUser = async (req, res) => {
  await validate(createUserSchema, req.body);

  await findUser(req.body.email);

  const {
    email, admin, firstname, lastname, gender, jobrole, department, address,
  } = req.body;

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
};

const signIn = async (req, res) => {
  await validate(signInSchema, req.body);

  const { email, password } = req.body;

  const user = await attemptSignIn(email, password);

  const token = await getToken(user.user_id, user.rolenumber);

  const data = {
    token,
    userId: user.user_id,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

module.exports = {
  createUser,
  signIn,
};
