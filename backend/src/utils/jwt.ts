import jwt from "jsonwebtoken";
import { env } from "../config";

export class JwtUtil {
    static generateToken(
        payload: {
            userId: string;
            role: string;
        }
    ) {
        return jwt.sign(
            payload,
            env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
    }

    static verifyToken(
        token: string
    ) {
        return jwt.verify(
            token,
            env.JWT_SECRET
        );
    }
}