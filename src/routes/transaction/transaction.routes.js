import { Router } from "express";
import { create, findAll, findById } from "../../controllers/Transactioncontroller.js";

const router = Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);

export default router;