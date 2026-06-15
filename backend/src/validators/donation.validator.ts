import { z } from "zod";

export const createDonationSchema =
    z.object({
        category: z.string(),

        quantity: z.number().min(1),

        description: z.string(),

        condition: z.string(),

        pickupAddress: z.string(),

        preferredPickupDate:
            z.string(),
    });