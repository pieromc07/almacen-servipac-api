import { Router } from "express";  
import { create, edit, findAll, findById, remove } from "../../controllers/RoleController.js";

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

export default router;