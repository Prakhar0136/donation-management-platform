import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: [],
        });
    }

    if (
        "code" in err &&
        err.code === 11000
    ) {
        return res.status(409).json({
            success: false,
            message:
                "Duplicate value detected",
            errors: [],
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
    });
};