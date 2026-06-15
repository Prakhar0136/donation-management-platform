import { Router } from "express";
import { DonationController } from "../controllers/donation.controller";
import { validate } from "../middlewares/validate.middleware";
import { createDonationSchema } from "../validators/donation.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    validate(createDonationSchema),
    DonationController.createDonation
);

router.get(
    "/my",
    authenticate,
    DonationController.getMyDonations
);

router.get(
    "/:id",
    DonationController.getDonationById
);

router.patch(
    "/:id/cancel",
    authenticate,
    DonationController.cancelDonation
);

export default router;
