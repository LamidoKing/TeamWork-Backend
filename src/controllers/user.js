const { encrypt, attemptCreateUser, getToken } = require('../utils');
const db = require('../db');
const { createUserQuery } = require('../queries');

require('dotenv').config();

const createUser = async (req, res, next) => {
  try {
    const {
      admin, firstname, lastname, gender, jobrole, department, address,
    } = req.body;

    const email = await attemptCreateUser(req.body.email);

    const password = await encrypt(req.body.password);

    const rolenumber = admin ? process.env.ADMIN : process.env.USER;

    const value = [email, password, rolenumber, firstname, lastname, gender, jobrole, department, address]

    const { rows } = await db.query(createUserQuery, value);

    const token = await getToken(rows[0].user_id, rolenumber);

    const data = {
      message: 'User added successfully!',
      token,
      userId: rows[0].user_id,
      email: rows[0].email,
      firstName: rows[0].firstname,
      lastName: rows[0].lastName,
      gender: rows[0].gender,
      jobRole: rows[0].jobrole,
      department: rows[0].department,
      address: rows[0].address,
    };

    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'err',
      error,
    });
  }
};


module.exports = {
  createUser,
};
