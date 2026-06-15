import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import {
    registerSchema,
    loginSchema,
} from "../validators/auth.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    AuthController.register
);

router.post(
    "/login",
    validate(loginSchema),
    AuthController.login
);

router.get(
    "/me",
    authenticate,
    AuthController.me
);

export default router;