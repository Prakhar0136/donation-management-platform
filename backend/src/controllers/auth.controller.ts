import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ResponseUtil } from "../utils/response";

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

            ResponseUtil.success(
                res,
                result,
                "Login successful"
            );
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