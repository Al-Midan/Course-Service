import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./presentation/routes/courseRouter";
import connectDb from "./config/db/connect";
import cookieParser from "cookie-parser";

dotenv.config(); 

const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use("/", router);

// Database connection and server start
connectDb
  .then(() => {
    console.log("MongoDB connected successfully");

    // Start the server
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Error connecting to MongoDB:", err);
  });

export default app;
