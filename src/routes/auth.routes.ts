import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
//@ts-expect-error ---paq no se queje de que no existe el metodo register en AuthController y no llore---
router.post('/register', AuthController.register);

export default router;