import express from "express";
import connectDB from "./config/db";
import { tasksRoute } from "./router/tasks";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connectDB();

tasksRoute(app);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
