import { Router } from "express";
import { create, findAll, findById } from "../../controllers/Transactioncontroller.js";
import { verifyToken } from "../../middlewares/security.js";
const router = Router();

router.post("/", [verifyToken], create);
router.get("/", [verifyToken], findAll);
router.get("/:id", [verifyToken], findById);

export default router;