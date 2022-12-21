import { Router } from "express";
import { create, update, findAll, findById, remove} from "../../controllers/ProductoController.js";
import { verifyToken } from "../../middlewares/security.js";
const router = Router();

router.post("/", [verifyToken], create);
router.put("/:id", [verifyToken], update);
router.get("/", [verifyToken], findAll);
router.get("/:id", [verifyToken], findById);
router.delete("/:id", [verifyToken], remove);

export default router;