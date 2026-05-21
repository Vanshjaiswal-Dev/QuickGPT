import express from "express";
import { z } from "zod";
import { getPublishedImages, getUser, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";

const userRouter = express.Router();

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  })
});

userRouter.post('/register', validate(registerSchema), registerUser);
userRouter.post('/login', validate(loginSchema), loginUser);
userRouter.get('/data', protect, getUser);
userRouter.get('/published-images', getPublishedImages);

export default userRouter;
