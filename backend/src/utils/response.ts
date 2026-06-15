import { Response } from "express";

export class ResponseUtil {
    static success(
        res: Response,
        data: any,
        message = "Success",
        statusCode = 200
    ) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
}