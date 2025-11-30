import { Router } from "express";
import { create, list, remove } from "../controllers/requestController.js";

const router = Router();

router.post("/", create);
router.get("/", list);
router.delete("/:id", remove);

export default router;
