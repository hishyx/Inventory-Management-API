import mongoose from "mongoose";
import env from "../../../../config/zod.env.js";

const connectDB = async (startApp: () => void | Promise<void>) => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log("Database connected");

    await startApp();
  } catch (err) {
    console.error("Startup failed:", err);
    throw err;
  }
};

export default connectDB;
