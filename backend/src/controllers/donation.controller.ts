import { Response } from "express";
import { DonationService } from "../services/donation.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ResponseUtil } from "../utils/response";
import { DONATION_STATUS } from "../constants";


export class DonationController {
    static createDonation = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {
            const donation =
                await DonationService.createDonation(
                    req.user!.userId,
                    req.body
                );

            ResponseUtil.success(
                res,
                donation,
                "Donation created successfully"
            );
        }
    );

    static getMyDonations = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {
            const page =
                Number(req.query.page) || 1;

            const limit =
                Number(req.query.limit) || 10;

            const donations = await DonationService.getMyDonations(
                req.user!.userId,
                page,
                limit
            );

            ResponseUtil.success(
                res,
                donations,
                "Donations fetched successfully"
            );
        }
    );

    static getDonationById = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {
            const donation =
                await DonationService.getDonationById(
                    req.params.id as string,
                    req.user!.userId
                );

            ResponseUtil.success(
                res,
                donation,
                "Donation fetched successfully"
            );
        }
    );

    static cancelDonation = asyncHandler(
        async (
            req: AuthRequest,
            res: Response
        ) => {
            const donation =
                await DonationService.cancelDonation(
                    req.params.id as string,
                    req.user!.userId
                );

            ResponseUtil.success(
                res,
                {
                    donation,
                    status: DONATION_STATUS.CANCELLED
                },
                "Donation cancelled successfully"
            );
        }
    );
}