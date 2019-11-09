
const createUserQuery = `
INSERT INTO users 
(email, password, rolenumber, firstname, lastname, gender, jobrole, department, address)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning * 
`;

const findUserQuery = 'SELECT email FROM users WHERE email = $1';

module.exports = {
  createUserQuery,
  findUserQuery,
};
