import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(errorHandler(403, "Aucun token fourni."));
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
