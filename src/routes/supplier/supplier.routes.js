import { Router } from "express";
import { create, findAll, findById, update, remove } from "../../controllers/SupplierController.js";

const router = Router();

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;