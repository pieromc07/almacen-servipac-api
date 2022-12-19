import { Router } from "express";
import { findById, edit, deleted, findAll } from "../../controllers/UserController.js";
const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', edit);
router.delete('/:id', deleted);

export default router;