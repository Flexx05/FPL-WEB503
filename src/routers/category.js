import { createCategory, getCategory } from "../controllers/category";
import { Router } from "express";

const router = Router();
router.get("/categories/:id", getCategory);
router.post("/categories", createCategory);

export default router;
