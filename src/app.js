import express from "express";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import authRouter from "./routers/auth";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
// router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);
export const viteNodeApp = app;

// Spread Oparator
