import { AppError } from "../utils/AppError";
import { UserRepository } from "../repositories/user.repository";
import { PasswordUtil } from "../utils/password";

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
}