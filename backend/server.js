//Import Package
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import autRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

//Variables
const app = express();
const port = 3000;

//Middleware
dotenv.config();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", autRoutes);
app.use("/api/user", userRoutes);

// Middleware d'erreur
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
