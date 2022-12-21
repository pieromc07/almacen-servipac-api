import { Router } from "express";
import { create, findAll, findById, remove, update } from "../../controllers/CategoryController.js";
import { verifyToken } from "../../middlewares/security.js";
const router = Router();

router.post('/', [verifyToken], create);
router.get('/', [verifyToken], findAll);
router.get('/:id', [verifyToken], findById);
router.put('/:id', [verifyToken], update);
router.delete('/:id', [verifyToken], remove);

export default router;
