import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./user/user.routes.js";
import roleRoutes from "./role/role.routes.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);



export default router;