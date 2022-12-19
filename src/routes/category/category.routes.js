import { Router } from "express";
import { create, findAll, findById, remove, update } from "../../controllers/CategoryController.js";

const router = Router();

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
