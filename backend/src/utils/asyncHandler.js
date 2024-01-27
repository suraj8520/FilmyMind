const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res).catch((err) => {
      next(err);
    });
  };
};

export default asyncHandler;

// const asyncHandler = (fn) => {
//   return async (req, res, next) => {
//     try {
//       await fn(req, res);
//     } catch (err) {
//       next(err);
//     }
//   };
// };
