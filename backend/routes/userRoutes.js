import { Router } from "express";
import { register, list, get, update, remove, changePassword } from "../controllers/userController.js";

const router = Router();

router.post("/", register);
router.get("/", list);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", remove);
router.put("/change-password", changePassword);

export default router;
