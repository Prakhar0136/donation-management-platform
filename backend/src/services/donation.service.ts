import { AppError } from "../utils/AppError";
import { DonationRepository } from "../repositories/donation.repository";

export class DonationService {
    static async createDonation(
        donorId: string,
        data: any
    ) {
        return DonationRepository.create({
            donorId,
            ...data,
        });
    }

    static async getMyDonations(
        donorId: string,
        page: number = 1,
        limit: number = 10
    ) {
        return DonationRepository.findByDonor(
            donorId,
            page,
            limit
        );
    }

    static async getDonationById(
        id: string,
        userId: string
    ) {
        const donation =
            await DonationRepository.findById(
                id
            );

        if (!donation) {
            throw new AppError(
                "Donation not found",
                404
            );
        }

        if (
            donation.donorId.toString() !== userId
        ) {
            throw new AppError(
                "Access denied",
                403
            );
        }

        return donation;
    }

    static async cancelDonation(
        id: string,
        donorId: string
    ) {
        const donation =
            await this.getDonationById(id, donorId);

        if (
            donation.donorId.toString() !==
            donorId
        ) {
            throw new AppError(
                "Unauthorized to cancel this donation",
                403
            );
        }

        return DonationRepository.update(
            id,
            {
                status: "cancelled",
            }
        );
    }
}