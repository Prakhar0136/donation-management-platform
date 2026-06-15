import { Schema, model, Document, Types } from "mongoose";

export interface IDonation extends Document {
    donorId: Types.ObjectId;

    ngoId?: Types.ObjectId;

    volunteerId?: Types.ObjectId;

    category: string;

    quantity: number;

    description: string;

    condition: string;

    images: string[];

    pickupAddress: string;

    latitude?: number;

    longitude?: number;

    preferredPickupDate: Date;

    status: string;

    aiCategory?: string;

    aiCondition?: string;

    isDeleted: boolean;

    createdAt: Date;

    updatedAt: Date;
}

const donationSchema =
    new Schema<IDonation>(
        {
            donorId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            ngoId: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },

            volunteerId: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },

            category: {
                type: String,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },

            description: {
                type: String,
                required: true,
            },

            condition: {
                type: String,
                required: true,
            },

            images: {
                type: [String],
                default: [],
            },

            pickupAddress: {
                type: String,
                required: true,
            },

            latitude: Number,

            longitude: Number,

            preferredPickupDate: {
                type: Date,
                required: true,
            },

            status: {
                type: String,
                default: "created",
                index: true,
            },

            aiCategory: String,

            aiCondition: String,

            isDeleted: {
                type: Boolean,
                default: false,
                index: true,
            },
        },
        {
            timestamps: true,
        }
    );

donationSchema.index({
    donorId: 1,
});

donationSchema.index({
    ngoId: 1,
});

donationSchema.index({
    volunteerId: 1,
});

donationSchema.index({
    status: 1,
});

donationSchema.index({
    createdAt: -1,
});

export const Donation = model<IDonation>("Donation", donationSchema);