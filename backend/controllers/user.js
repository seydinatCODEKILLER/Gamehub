import User from "../models/users.js";
import path from "path";

export const uploadProfileController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newAvatarUrl = `${process.env.BACKEND_URL}/uploads/profile/${path
      .basename(req.file.path)
      .replace(/\\/g, "/")}`;

    // Mise à jour de l'avatar dans la base de données
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: newAvatarUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Photo de profil mise à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
