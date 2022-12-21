import { Router } from "express";
import { findById, edit, deleted, findAll } from "../../controllers/UserController.js";
import { verifyToken, verifyRole } from "../../middlewares/security.js";
const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', verifyToken, verifyRole(['ADMIN']), edit);
router.delete('/:id' , verifyToken, verifyRole(['ADMIN']), deleted);

export default router;