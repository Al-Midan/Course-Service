import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./presentation/routes/courseRouter";
import connectDb from "./config/db/connect";
import cookieParser from "cookie-parser";
import secondRouter from "./presentation/routes/buyCourseRouter";
import { kafkaProducer } from "./infrastructure/broker/kafkaBroker/kafkaProducer"; 
import { consumeEnrolledCoursesRequests } from "./infrastructure/broker/kafkaBroker/kafkaConsumer"; 

dotenv.config();

const app = express();

// cors setup
const allowedOrigins = [
  'https://al-midan-frontend.vercel.app',
  'https://localhost:3000',
  'http://13.71.112.129',
  'https://peducoggsc.execute-api.ap-south-1.amazonaws.com'
];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use("/", router);
app.use("/", secondRouter);

async function startApp() {
  try {
    // Connect to MongoDB
    await connectDb;
    console.log("MongoDB connected successfully");

    // Initialize Kafka producer
    await kafkaProducer.connect();
    console.log("Kafka producer connected successfully");

    // Start consuming enrolled courses requests
    await consumeEnrolledCoursesRequests();
    console.log("Kafka consumer started successfully");

    // Start the server
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the application:", err);
    process.exit(1);
  }
}

startApp();

export default app;