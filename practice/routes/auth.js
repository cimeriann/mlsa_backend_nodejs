import Router from 'express';
import { login, registerAccount } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', registerAccount);
authRouter.post('login', login);

export default authRouter;