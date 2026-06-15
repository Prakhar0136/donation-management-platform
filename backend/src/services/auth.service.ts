import { AppError } from "../utils/AppError";
import { UserRepository } from "../repositories/user.repository";
import { PasswordUtil } from "../utils/password";
import { JwtUtil } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt.types";
import { env } from "../config/env";

export class AuthService {
    static async register(data: {
        name: string;
        email: string;
        password: string;
        role: "donor" | "ngo" | "volunteer";
    }) {
        const existingUser =
            await UserRepository.findByEmail(
                data.email
            );

        if (existingUser) {
            throw new AppError(
                "User already exists",
                409
            );
        }

        const hashedPassword =
            await PasswordUtil.hash(
                data.password
            );

        const user =
            await UserRepository.create({
                ...data,
                password: hashedPassword,
            });

        const userObject = user.toObject();

        const { password, ...safeUser } = userObject;

        return safeUser;
    }

    static async login(data: {
        email: string;
        password: string;
    }) {
        const user =
            await UserRepository.findByEmailWithPassword(
                data.email
            );

        if (!user) {
            throw new AppError(
                "Invalid credentials",
                401
            );
        }

        const isMatch =
            await PasswordUtil.compare(
                data.password,
                user.password
            );

        if (!isMatch) {
            throw new AppError(
                "Invalid credentials",
                401
            );
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
        };

        const accessToken =
            JwtUtil.generateToken(payload);

        const refreshToken =
            JwtUtil.generateRefreshToken(
                payload
            );

        const userObject =
            user.toObject();

        const { password, ...safeUser } =
            userObject;

        return {
            accessToken,
            refreshToken,
            user: safeUser,
        };
    }

    static async getMe(
        userId: string
    ) {
        const user =
            await UserRepository.findById(
                userId
            );

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }
        const userObject = user.toObject();

        const { password, ...safeUser } = userObject;

        return {
            user: safeUser
        };

    }

    static refreshToken(
        refreshToken: string
    ) {
        const decoded =
            jwt.verify(
                refreshToken,
                env.JWT_REFRESH_SECRET
            ) as JwtPayload;

        return JwtUtil.generateToken({
            userId: decoded.userId,
            role: decoded.role,
        });
    }
}