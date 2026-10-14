import mongoose from "mongoose";
import httpError from "../utils/custom.error.class.js";

const connectDB = (startApp: () => {}) => {
  if (!process.env.MONGO_URL) throw new httpError("No db url found");

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connected");

      startApp();
    })
    .catch(() => {
      throw new httpError("Database connection failed");
    });
};

export default connectDB;
