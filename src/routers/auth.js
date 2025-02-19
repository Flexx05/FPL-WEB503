import { Router } from "express";
import { getAllUsers, signin, signup } from "../controllers/auth";

const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getAllUsers);
export default router;
