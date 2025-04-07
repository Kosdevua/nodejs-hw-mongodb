//для обробки помилок у вашому Express-сервері (має приймати чотири аргументи, )

// import { HttpErrors } from 'http-errors';
export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = error;

  res.status(status).json({
    message,
  });
};
