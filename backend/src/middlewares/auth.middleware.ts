import {
    Request,
    Response,
    NextFunction,
} from "express";

import { AppError } from "../utils/AppError";
import { JwtUtil } from "../utils/jwt";

export interface AuthRequest
    extends Request {
    user?: any;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        throw new AppError(
            "Unauthorized",
            401
        );
    }

    const token =
        authHeader.split(" ")[1];

    const decoded =
        JwtUtil.verifyToken(token);

    req.user = decoded;

    next();
};