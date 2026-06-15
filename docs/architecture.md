# System Architecture

## Overview

Threads of Hope AI follows a layered backend architecture to ensure scalability, maintainability, and separation of concerns.

The application consists of:

* Frontend (Next.js + React)
* Backend (Node.js + Express + TypeScript)
* MongoDB Atlas Database
* Cloudinary Storage
* Gemini AI Integration
* Socket.IO for Real-Time Communication

---

# Request Flow

A typical request follows the flow below:

User
↓
Frontend (Next.js)
↓
API Request
↓
Route
↓
Controller
↓
Service
↓
Repository
↓
MongoDB Database
↓
Response
↓
Frontend

Example:

Donor Creates Donation
↓
Frontend Sends Request
↓
POST /api/v1/donations
↓
Donation Route
↓
Donation Controller
↓
Donation Service
↓
Donation Repository
↓
MongoDB
↓
Success Response Returned

---

# Backend Layered Architecture

The backend follows the architecture:

Route
↓
Controller
↓
Service
↓
Repository
↓
Database

---

## Route Layer

Responsibilities:

* Define API endpoints
* Connect endpoints to controllers
* Attach middleware

Examples:

* POST /api/v1/auth/login
* POST /api/v1/donations
* GET /api/v1/ngos

Routes should not contain business logic or database queries.

---

## Controller Layer

Responsibilities:

* Receive requests
* Extract request data
* Call services
* Return responses

Controllers act as the bridge between routes and services.

Controllers should not contain database queries.

---

## Service Layer

Responsibilities:

* Business logic
* Application workflows
* Validation orchestration
* Reward calculations
* Notification triggering
* Audit log creation

Example:

Donation Created
↓
Assign Reward Points
↓
Create Notification
↓
Create Audit Log

Services contain the core business rules of the platform.

---

## Repository Layer

Responsibilities:

* Database operations only
* Create records
* Update records
* Delete records
* Query records

Repositories abstract MongoDB operations from business logic.

---

## Database Layer

MongoDB Atlas is the primary database.

Responsibilities:

* Persistent storage
* Indexing
* Query execution
* Data relationships

---

# Backend Folder Structure

backend/
│
└── src/
│
├── config/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── validators/
├── models/
├── sockets/
├── jobs/
├── utils/
├── types/
├── constants/
├── app.ts
└── server.ts

---

# Folder Responsibilities

## config/

Application configuration.

Examples:

* Database configuration
* JWT configuration
* Cloudinary configuration
* Gemini configuration
* Environment variable loading

---

## controllers/

Handles incoming requests and outgoing responses.

Examples:

* AuthController
* DonationController
* NGOController
* VolunteerController

---

## services/

Contains business logic.

Examples:

* AuthService
* DonationService
* RewardService
* NotificationService

---

## repositories/

Contains MongoDB data access logic.

Examples:

* UserRepository
* DonationRepository
* NotificationRepository

---

## routes/

Defines API endpoints.

Examples:

* auth.routes.ts
* donation.routes.ts
* ngo.routes.ts

---

## middlewares/

Reusable request-processing logic.

Examples:

* Authentication middleware
* Authorization middleware
* Error handling middleware
* Validation middleware

---

## validators/

Request validation schemas.

Examples:

* Auth validation
* Donation validation
* Review validation

Validation will be implemented using Zod.

---

## models/

MongoDB/Mongoose schema definitions.

Examples:

* User Model
* Donation Model
* NGO Profile Model

Responsibilities:

* Field definitions
* Data types
* Enums
* Indexes

---

## sockets/

Socket.IO event handling.

Examples:

* Real-time notifications
* Chat events
* Donation tracking events

---

## jobs/

Background jobs and scheduled tasks.

Examples:

* Certificate generation
* Scheduled notifications
* Daily reports

---

## utils/

Reusable helper functions.

Examples:

* QR code generation
* Email sender
* Date utilities
* Cloudinary upload helpers

---

## types/

Custom TypeScript types and interfaces.

Examples:

* AuthenticatedRequest
* ApiResponse
* JwtPayload

---

## constants/

Application-wide constants.

Examples:

* User roles
* Donation statuses
* Notification types
* Reward point values

---

# Application Entry Files

## app.ts

Responsible for:

* Creating Express application
* Registering middleware
* Registering routes

---

## server.ts

Responsible for:

* Starting HTTP server
* Initializing Socket.IO
* Bootstrapping application startup

---

# Design Principles

The architecture follows these principles:

* Separation of Concerns
* Single Responsibility Principle
* Reusability
* Scalability
* Maintainability
* Testability
* Clean Code Practices

This architecture provides a strong foundation for building an enterprise-grade donation management platform.
