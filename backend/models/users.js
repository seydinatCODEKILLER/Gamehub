import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "un nom d'utilisateur est requis"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "une adresse e-mail est requise"],
    match: [/.+\@.+\..+/, "Veuillez fournir une adresse email valide"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "un mot de passe est requis"],
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
