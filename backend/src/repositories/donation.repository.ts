import {
    Donation,
    IDonation,
} from "../models/donation.model";

export class DonationRepository {
    static async create(
        data: Partial<IDonation>
    ) {
        return Donation.create(data);
    }

    static async findById(id: string) {
        return Donation.findById(id);
    }

    static async findByDonor(
        donorId: string,
        page: number,
        limit: number
    ) {
        const skip =
            (page - 1) * limit;

        return Donation.find({
            donorId,
            isDeleted: false,
        })
            .skip(skip)
            .limit(limit)
            .sort({
                createdAt: -1,
            });
    }

    static async update(
        id: string,
        data: Partial<IDonation>
    ) {
        return Donation.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }
}