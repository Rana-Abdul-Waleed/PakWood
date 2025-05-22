import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";

dotenv.config();

// database connectivity
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB database.");
  })
  .catch((err) => {
    console.log(err);
  });

// express app
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// run the server
app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});

// routes
app.use("/backend/user", userRoutes);

// custom error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
