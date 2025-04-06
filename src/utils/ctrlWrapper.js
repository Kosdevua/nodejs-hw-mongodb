// обгортка для контролерів у вашому Express-додатку, для автоматичної обробки помилок, що можуть виникнути під час виконання запитів. В цій обгортці при виникненні помилки викличте next(err) для залучення middleware errorHandler

export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
