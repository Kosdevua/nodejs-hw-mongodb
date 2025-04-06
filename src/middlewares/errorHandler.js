// export const errorHandler

// Створіть у файлі src/middlewares/errorHandler.js і застосуйте в файлі src/server.js middleware errorHandler, призначений для обробки помилок у вашому Express-сервері. Цей middleware має приймати чотири аргументи. errorHandler у разі виявлення помилки має відправити клієнту відповідь зі статусом 500 та об’єкт з наступними властивостями:

// {
//     status: 500,
//     message: "Something went wrong",
//     data:
//     // конкретне повідомлення про помилку, отримане з об'єкта помилки
// }

export const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
