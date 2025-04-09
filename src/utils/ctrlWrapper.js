export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log('Error in ctrlWrapper:', error);
      next(error);
    }
  };
  return func;
};
