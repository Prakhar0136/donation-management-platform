import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";

export class AuthController {
    static register = asyncHandler(
        async (req: Request, res: Response) => {
            const user =
                await AuthService.register(
                    req.body
                );

            res.status(201).json({
                success: true,
                message:
                    "User registered successfully",
                data: user,
            });
        }
    );

    static login = asyncHandler(
        async (req: Request, res: Response) => {
            const result =
                await AuthService.login(
                    req.body
                );

            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result,
            });
        }
    );

    static me = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {
            const user =
                await AuthService.getMe(
                    req.user.userId
                );

            res.status(200).json({
                success: true,
                data: user,
            });
        }
    );
}