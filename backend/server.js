import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
/*Routes */
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
/*Middleware */
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
/*Externals */
import colors from "colors";
import cors from "cors";
/**
 * Load ENV's
 */
dotenv.config();
/**
 * Connect to Database
 */
connectDB();
/**
 * Initialize Express App
 */
const app = express();
/**
 * App Configuration
 */
app.use(cors());
app.use(express.json());
/**
 * Mount Routes
 */
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

/**
 * Custom Path
 */
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

/**
 * Custom Error Handler
 */
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
