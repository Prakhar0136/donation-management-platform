# Database Design

## Overview

The application uses MongoDB Atlas as the primary database.

All collections will use:

* MongoDB ObjectId as primary key
* createdAt timestamp
* updatedAt timestamp
* Soft Delete strategy where applicable

---

# User Roles

Supported roles:

* donor
* ngo
* volunteer
* admin

---

# Collections

## 1. Users

Purpose:
Store authentication and profile information for all platform users.

Major Fields:

* _id
* name
* email
* password
* role
* phone
* profileImage
* isVerified
* rewardPoints
* badge
* city
* state
* lastLogin
* createdAt
* updatedAt
* isDeleted

Notes:

* Email must be unique.
* Password will be stored as a bcrypt hash.
* Current reward points are stored here for fast dashboard access.

---

## 2. NGO Profiles

Purpose:
Store NGO-specific information that does not belong in the Users collection.

Major Fields:

* _id
* userId
* ngoName
* registrationNumber
* description
* address
* city
* state
* documents
* verificationStatus
* verifiedBy
* createdAt
* updatedAt
* isDeleted

Notes:

* userId references Users collection.
* NGO verification documents will be stored in Cloudinary.

---

## 3. Donations

Purpose:
Core collection that tracks all donations throughout their lifecycle.

Major Fields:

* _id
* donorId
* ngoId
* volunteerId
* category
* quantity
* description
* condition
* images
* pickupAddress
* latitude
* longitude
* preferredPickupDate
* status
* aiCategory
* aiCondition
* createdAt
* updatedAt
* isDeleted

Notes:

* Images will be stored in Cloudinary.
* AI-generated category and condition will be stored separately from user input.
* Coordinates will support maps and route calculations.

---

# Donation Status Enum

Allowed donation statuses:

* created
* pending_review
* accepted
* volunteer_assigned
* pickup_scheduled
* collected
* delivered
* completed
* rejected
* cancelled

Donation lifecycle:

created
→ pending_review
→ accepted
→ volunteer_assigned
→ pickup_scheduled
→ collected
→ delivered
→ completed

---

## 4. Volunteer Assignments

Purpose:
Maintain volunteer assignment history for donations.

Major Fields:

* _id
* donationId
* volunteerId
* assignedBy
* status
* assignedAt
* createdAt
* updatedAt

Notes:

* Preserves reassignment history.
* Allows tracking of volunteer performance.

---

## 5. Notifications

Purpose:
Store system notifications for users.

Major Fields:

* _id
* userId
* title
* message
* type
* isRead
* createdAt

Notification Types:

* DONATION_CREATED
* DONATION_ACCEPTED
* VOLUNTEER_ASSIGNED
* PICKUP_SCHEDULED
* CERTIFICATE_GENERATED
* REWARD_EARNED

---

## 6. Rewards

Purpose:
Maintain reward point transaction history.

Major Fields:

* _id
* userId
* donationId
* points
* reason
* createdAt

Examples:

* Food Donation
* Books Donation
* Electronics Donation
* Special Campaign Bonus

---

## 7. Certificates

Purpose:
Store donation completion certificates.

Major Fields:

* _id
* userId
* donationId
* certificateUrl
* generatedAt

Notes:

* PDF files will be stored in Cloudinary.
* Database stores only the URL.

---

## 8. Chat Messages

Purpose:
Enable communication between donors, NGOs, volunteers, and administrators.

Major Fields:

* _id
* senderId
* receiverId
* message
* read
* createdAt

Notes:

* Real-time delivery will be implemented using Socket.IO.

---

## 9. Reviews

Purpose:
Allow donors to rate and review NGOs.

Major Fields:

* _id
* donorId
* ngoId
* rating
* review
* createdAt

Rules:

* Rating range: 1 to 5
* One donor can review an NGO after a completed donation

---

## 10. Audit Logs

Purpose:
Track important platform activities for monitoring and security.

Major Fields:

* _id
* action
* entityType
* entityId
* performedBy
* metadata
* createdAt

Examples:

* DONATION_CREATED
* DONATION_ACCEPTED
* DONATION_REJECTED
* VOLUNTEER_ASSIGNED
* USER_LOGIN
* USER_REGISTERED

---

# Soft Delete Strategy

Instead of permanently deleting records, the platform will use soft deletion.

Example:

{
"isDeleted": true
}

Benefits:

* Recovery of accidentally deleted data
* Audit trail preservation
* Improved system reliability

---

# Index Plan

## Users

Indexes:

* email (unique)

Reason:

* Fast login
* Fast user lookup

---

## Donations

Indexes:

* donorId
* ngoId
* volunteerId
* status

Reason:

* Dashboard filtering
* Status tracking
* Donation searches

---

## Notifications

Indexes:

* userId

Reason:

* Fast notification retrieval

---

## Rewards

Indexes:

* userId

Reason:

* Fast reward history lookup

---

## Reviews

Indexes:

* ngoId

Reason:

* Fast NGO rating calculation

---

## Audit Logs

Indexes:

* entityId
* performedBy

Reason:

* Fast activity investigation
* Security auditing

---

# Future Enhancements

Planned future collections:

* Leaderboards
* Impact Reports
* Categories
* Pickup Routes
* Sponsorship Management
* Community Posts
* Volunteer Performance Metrics

These collections are intentionally excluded from the initial MVP and may be added in later phases.
