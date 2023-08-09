/**
 * Write your stealAmount middleware here
 */
export const stealAmount = (req, res, next) => {
  try {
    if (!req.body.secure) {
      if (typeof req.body.amount === "number") {
        req.body.amount /= 2;
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const postMiddleware = (req, res, next) => {
  try {
    if (!req.body.amount) {
      req.body.amount = 0;
    }
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
