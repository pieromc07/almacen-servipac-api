import { Router } from "express";
import { create, findAll, findById, remove, update, findByWarehouse } from "../../controllers/RackController.js";
import { verifyToken } from "../../middlewares/security.js";
const router = Router();

router.post('/', [verifyToken], create);
router.get('/', [verifyToken], findAll);
router.get('/:id', [verifyToken], findById);
router.put('/:id', [verifyToken], update);
router.delete('/:id', [verifyToken], remove);
router.get('/warehouse/:id', [verifyToken], findByWarehouse);

export default router;
