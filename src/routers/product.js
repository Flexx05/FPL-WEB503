import {
  getProductsById,
  removeProduct,
  updateProduct,
  createProduct,
  getALLProducts,
} from "../controllers/product";
import { Router } from "express";
const router = Router();
router.get("/products", getALLProducts);
router.get("/products/:id", getProductsById);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", removeProduct);
export default router;
