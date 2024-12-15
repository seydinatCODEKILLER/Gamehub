import mongoose from "mongoose";

const connectDB = async (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Connection a mongoDB reussit..."));
};

export default connectDB;
