import { Router } from "express";
import { create, update, findAll, findById, remove} from "../../controllers/ProductoController.js";

const router = Router();

router.post("/", create);
router.put("/:id", update);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", remove);

export default router;