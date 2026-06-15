import { IUser, User } from "../models/user.model";

export class UserRepository {
    static async create(
        userData: Partial<IUser>
    ) {
        return User.create(userData);
    }

    static async findByEmail(email: string) {
        return User.findOne({ email });
    }

    static async findById(id: string) {
        return User.findById(id);
    }
}