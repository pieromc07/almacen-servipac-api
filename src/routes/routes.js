import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./user/user.routes.js";
import roleRoutes from "./role/role.routes.js";
import categoryRoutes from "./category/category.routes.js";
import supplierRoutes from "./supplier/supplier.routes.js";
const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/category', categoryRoutes);
router.use('/supplier', supplierRoutes);




export default router;