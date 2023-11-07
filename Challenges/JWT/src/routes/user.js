import { Router } from "express";
import { userController } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userRouter = Router()

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)
userRouter.get('/profile', verifyToken, userController.profile)
userRouter.get('/users', userController.users)