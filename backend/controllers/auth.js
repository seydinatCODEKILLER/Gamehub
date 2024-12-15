import User from "../models/users.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import path from "path";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already exists"));
    }
    if (password.length < 4) {
      return next(
        errorHandler(400, "Le Mot de passe doit faire au moins 4 caractères")
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let avatar = process.env.DEFAULT_PROFILE;
    if (req.file) {
      avatar = `${process.env.BACKEND_URL}/uploads/profile/${path
        .basename(req.file.path)
        .replace(/\\/g, "/")}`;
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    res.status(201).json({
      message: "Utlisateur crée",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
export const signInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "Utilisateur non trouvé"));
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Mot de passe incorrect"));
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({
      message: "Connexion réussie",
      token,
      rest,
    });
  } catch (error) {
    next(error);
  }
};
