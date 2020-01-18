/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const catchAsync = (handler) => (
  ...args
) => handler(...args).catch(args[2]);

const notFound = (req, res, next) => res.status(404).json({ status: 'error', message: 'Not Found' });

const serverError = (err, req, res, next) => {
  if (!err.status) {
    console.error(err.stack);
  }

  res
    .status(err.status || 500)
    .json({ status: 'error', message: err.message || 'Internal Server Error' });
};

module.exports = { catchAsync, notFound, serverError };
