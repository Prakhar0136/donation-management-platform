export const ALLOWED_TRANSITIONS = {
    created: [
        "pending_review",
        "cancelled",
    ],

    pending_review: [
        "accepted",
        "rejected",
    ],

    accepted: [
        "volunteer_assigned",
    ],

    volunteer_assigned: [
        "pickup_scheduled",
    ],

    pickup_scheduled: [
        "collected",
    ],

    collected: [
        "delivered",
    ],

    delivered: [
        "completed",
    ],
};