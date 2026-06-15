import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { AppError } from "../utils/AppError";

export const authorize =
    (...roles: string[]) =>
        (
            req: AuthRequest,
            res: Response,
            next: NextFunction
        ) => {
            if (!req.user) {
                throw new AppError(
                    "Unauthorized",
                    401
                );
            }

            if (
                !roles.includes(req.user.role)
            ) {
                throw new AppError(
                    "Forbidden",
                    403
                );
            }

            next();
        };