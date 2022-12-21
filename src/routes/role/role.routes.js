import { Router } from "express";  
import { create, edit, findAll, findById, remove } from "../../controllers/RoleController.js";
import { verifyToken, verifyRole } from "../../middlewares/security.js";
const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', verifyToken, verifyRole(['ADMIN']), create);
router.put('/:id', verifyToken, verifyRole(['ADMIN']), edit);
router.delete('/:id', verifyToken, verifyRole(['ADMIN']), remove);

export default router;