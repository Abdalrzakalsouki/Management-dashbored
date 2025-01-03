import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_CONNECTION_URL) {
      throw new Error("Database url is missing");
    }
    await mongoose.connect(process.env.DATABASE_CONNECTION_URL);
    console.log("Database connected");
  } catch (error) {
    console.error(`Database connection fail: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
