import express from "express";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect("mongodb://localhost:27017/wd19321");
// router
app.use("/api", productRouter);
app.use("/api", authRouter);
export const viteNodeApp = app;

// Spread Oparator
