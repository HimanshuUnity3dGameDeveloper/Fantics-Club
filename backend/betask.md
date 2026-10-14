# 📋 Fantics Club - Backend Task Tracker & Roadmap

**Project:** Fantics Club (Nightlife & VIP Table Reservation API)  
**Location:** `d:\work\fc_app\backend`  
**Tech Stack:** NestJS 12 + TypeScript 6 + MongoDB (Mongoose 9) + Vitest + Oxlint  
**Last Updated:** October 2026  

---

## 📊 1. Current Project Status

- **Overall Backend Completion:** ~20% – 25% (Foundation & Initial Schema Setup)
- **Database & Architecture:** ~70% (MongoDB connected via Mongoose, ConfigModule global, ESM configured)
- **Authentication & Security:** ~10% (Module & Controller skeleton created; JWT, bcrypt, and guards pending)
- **Core Business APIs (Venues, Cities, Bookings):** 0% (Pending creation)
- **Build Status:** ✅ Clean build (`npm run build` compiles with 0 errors to `dist/`)

---

## 🔍 2. Audit of Completed Work

### ✅ Framework, Tooling & Core Setup
- [x] Initialized NestJS 12 application configured as ECMAScript Module (`"type": "module"`).
- [x] Configured TypeScript 6 (`tsconfig.json`, `tsconfig.build.json`) with decorator metadata enabled (`experimentalDecorators`, `emitDecoratorMetadata`).
- [x] High-performance linter configured with Oxlint (`oxlint.json`).
- [x] Code formatter configured with Prettier (`.prettierrc`).
- [x] Modern test runner configured with Vitest (`vitest.config.ts` and `vitest.config.e2e.ts`).
- [x] End-to-end test boilerplate set up in `test/app.e2e-spec.ts`.

### ✅ Server Entrypoint & Configuration
- [x] Bootstrap logic in `src/main.ts` loading `AppModule` and listening on dynamic port `process.env.PORT || 3000`.
- [x] Environment configuration via `@nestjs/config` loaded globally (`ConfigModule.forRoot({ isGlobal: true })`).
- [x] Environment file `.env` containing server port, MongoDB Atlas connection string, and database name (`fc_db`).
- [x] Root health ping endpoint in `AppController` (`GET /` returning `"Hello World!"`).

### ✅ Database Integration (MongoDB & Mongoose)
- [x] Installed and configured `@nestjs/mongoose` (v12) and `mongoose` (v9).
- [x] Asynchronous database connection in `AppModule` using `MongooseModule.forRootAsync` injected with `ConfigService`.
- [x] Connected to MongoDB Atlas cluster with database namespace `fc_db`.

### ✅ User Domain Setup (`src/users`)
- [x] Comprehensive Mongoose schema defined in `src/users/users.model.ts`:
  - **Identity:** `firstName`, `lastName`, `userName` (unique), `email` (unique, lowercase), `mobile` (10-digit validation regex).
  - **Security:** `passwordHash` (configured with `select: false` to avoid leaking hashes in queries).
  - **Role Management:** `role` enum (`'admin' | 'user'`, default `'user'`).
  - **Profile Details:** `avatar`, `bio`, `website`, `isProfileComplete` (boolean flag), `active` status flag.
  - **Auditing:** Auto timestamps enabled (`createdAt`, `updatedAt`).
- [x] Strong TypeScript typing interface `UserModel` extending `mongoose.Document`.
- [x] Registered `User` schema in `UsersModule` via `MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])`.
- [x] `UsersService` skeleton created and registered as a provider.

### ✅ Authentication Module Skeleton (`src/auth`)
- [x] `AuthModule` created and imported into root `AppModule`.
- [x] `AuthController` created with route prefix `@Controller('auth')`.
- [x] `AuthService` created and registered in `AuthModule`.

---

## ⚠️ 3. Current Limitations & Technical Debt

- [ ] **No CORS Enabled:** `main.ts` does not yet enable CORS (`app.enableCors()`), which is required for the Angular/Ionic frontend (`http://localhost:8100`) and mobile web views.
- [ ] **Missing Global Validation:** Global `ValidationPipe` is not enabled, and DTO validation libraries (`class-validator`, `class-transformer`) are not yet installed.
- [ ] **Incomplete User Service & Controller:** `UsersService` is an empty class. No controller exists for user queries (`/users/me`, `/users/profile`).
- [ ] **Incomplete Auth Flow:** No password hashing (`bcrypt`), JWT generation (`@nestjs/jwt`, `@nestjs/passport`), or login/signup endpoints.
- [ ] **Missing Business Domains:** No modules/schemas exist for **Cities**, **Venues/Clubs**, **Vibes**, **Bookings/Passes**, or **Lineups**.
- [ ] **Standardized API Response Format:** Missing global response interceptor and exception filter for consistent response structures (`{ success, data, message, statusCode }`).

---

## 🗺️ 4. Master Task Checklist (Roadmap)

### Phase 1: Core Architecture & Security Foundation
- [ ] **Task 1.1:** Enable CORS in `src/main.ts` with origins for frontend development ports (`8100`, `4200`, `3000`).
- [ ] **Task 1.2:** Install validation dependencies (`class-validator`, `class-transformer`) and register global `ValidationPipe` in `main.ts`.
- [ ] **Task 1.3:** Set up Swagger API documentation (`@nestjs/swagger`) for automatic interactive API docs at `/api/docs`.
- [ ] **Task 1.4:** Create global response interceptor (`TransformInterceptor`) and HTTP exception filter.

---

### Phase 2: Authentication & User Management (`/auth` & `/users`)
- [ ] **Task 2.1:** Install auth packages: `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcrypt`, `@types/bcrypt`.
- [ ] **Task 2.2:** Implement User DTOs:
  - `CreateUserDto` (registration with validation rules)
  - `UpdateProfileDto` (bio, avatar, website, name)
  - `UserResponseDto` (safe projection excluding sensitive fields)
- [ ] **Task 2.3:** Implement `UsersService` methods:
  - `create(createUserDto)`
  - `findByEmail(email)`
  - `findByMobile(mobile)`
  - `findById(id)`
  - `updateProfile(id, updateDto)`
- [ ] **Task 2.4:** Build Auth Endpoints in `AuthController`:
  - `POST /auth/register` (Email + Mobile + Password)
  - `POST /auth/login` (Email/Mobile + Password -> JWT Token)
  - `POST /auth/send-otp` (Mobile OTP login trigger for nightlife app flow)
  - `POST /auth/verify-otp` (Verify mobile OTP -> Issue JWT)
  - `GET /auth/me` (Protected route returning current authenticated user)
- [ ] **Task 2.5:** Implement Auth Guards & Decorators:
  - `JwtAuthGuard` (protecting private endpoints)
  - `RolesGuard` (`@Roles('admin')`)
  - `@CurrentUser()` custom parameter decorator

---

### Phase 3: City Management Module (`/cities`)
*(Powers Frontend City Selector Page `/home/city`)*
- [ ] **Task 3.1:** Create `CitiesModule`, `CitiesController`, and `CitiesService`.
- [ ] **Task 3.2:** Define `City` Mongoose Schema:
  - Name (Mumbai, Bangalore, Hyderabad, Chennai, etc.)
  - Code / Slug (`BOM`, `BLR`, `HYD`, `MAA`)
  - Description & Hotspots list
  - Geo coordinates (`latitude`, `longitude`) for GPS auto-detection
  - Total venues count & booking occupancy stats
  - Cover image asset URL
  - Active status
- [ ] **Task 3.3:** Seed initial Indian metro cities (Mumbai, Bangalore, Hyderabad, Chennai).
- [ ] **Task 3.4:** Endpoints:
  - `GET /cities` (List all active cities)
  - `GET /cities/:idOrSlug` (Get city details with venue counts)
  - `POST /cities/detect` (Find nearest city based on user's GPS lat/lng)

---

### Phase 4: Venues & Nightlife Directory Module (`/venues`)
*(Powers Frontend Explore & Venue Directory)*
- [ ] **Task 4.1:** Create `VenuesModule`, `VenuesController`, and `VenuesService`.
- [ ] **Task 4.2:** Define `Venue` Mongoose Schema:
  - Name, slug, city ID reference
  - Vibe categories (`Clubbing`, `Lounge & Bar`, `Rooftop`, `Fine Dining`)
  - Location address, GPS coordinates, map link
  - Cover charge, minimum table spend, pricing tier (`₹`, `₹₹`, `₹₹₹`)
  - Images / gallery URLs
  - Operating hours & dress code policies
  - Table layouts (Standard Booth, High Table, DJ VIP)
  - Rating, review count, featured badge flag
- [ ] **Task 4.3:** Endpoints:
  - `GET /venues` (Filterable by `city`, `vibe`, `searchQuery`, `priceRange`)
  - `GET /venues/:id` (Full venue profile & tonight's details)
  - `POST /venues` (Admin: create new club/venue)
  - `PATCH /venues/:id` (Admin: update venue information)

---

### Phase 5: Events, DJ Lineups & Vibes (`/events` & `/vibes`)
- [ ] **Task 5.1:** Create `EventsModule` and `Event` schema (Event name, DJ/artist lineup, music genre, start/end time, date, ticket price).
- [ ] **Task 5.2:** Endpoints:
  - `GET /venues/:venueId/events` (Upcoming lineups for a specific club)
  - `GET /events/tonight` (All events occurring tonight across the selected city)
  - `GET /vibes` (List vibe categories with metadata and banner images)

---

### Phase 6: Reservations, VIP Tables & Ticketing (`/bookings`)
*(Powers Frontend Booking Modal & Digital Passes)*
- [ ] **Task 6.1:** Create `BookingsModule`, `BookingsController`, and `BookingsService`.
- [ ] **Task 6.2:** Define `Booking` Mongoose Schema:
  - User ID reference & Venue ID reference
  - Booking Type (`VIP Table`, `Guestlist`, `Stag`, `Couple`)
  - Date & slot time
  - Guest counts (Men, Women, Couples)
  - Table tier selection & minimum spend
  - Pricing summary (Cover fee, tax, discount, total paid)
  - Booking status (`pending`, `confirmed`, `cancelled`, `checked_in`)
  - Unique Pass Code & QR code payload
- [ ] **Task 6.3:** Endpoints:
  - `POST /bookings` (Create new table/guestlist reservation)
  - `GET /bookings/my-passes` (User's active passes & past history)
  - `GET /bookings/:id` (Single pass details with QR token)
  - `PATCH /bookings/:id/cancel` (Cancel reservation if within cancellation window)
  - `POST /bookings/verify-pass` (Club bouncer QR scanner validation endpoint)

---

### Phase 7: Payments & Notifications Integration
- [ ] **Task 7.1:** Payment Gateway Service (Razorpay / Stripe integration for Indian INR transactions).
- [ ] **Task 7.2:** Endpoints for payment order creation and webhook verification.
- [ ] **Task 7.3:** SMS / WhatsApp notification integration for instant ticket dispatch.

---

## 📁 5. Directory Structure Overview

```text
backend/
├── .env                       # Environment variables (PORT, MONGODB_URI, DB_NAME)
├── nest-cli.json              # Nest CLI configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript compilation config
├── vitest.config.ts           # Unit test configuration
├── vitest.config.e2e.ts       # E2E test configuration
├── src/
│   ├── main.ts                # Application entrypoint (port 3000)
│   ├── app.module.ts          # Root module (Config, Mongoose, Auth, Users)
│   ├── app.controller.ts      # Health check controller (GET /)
│   ├── app.service.ts         # Base service
│   ├── auth/                  # Authentication Module
│   │   ├── auth.controller.ts # Auth endpoints (Skeleton)
│   │   ├── auth.module.ts     # Auth module definition
│   │   └── auth.service.ts    # Auth business logic (Skeleton)
│   └── users/                 # Users Module
│       ├── users.model.ts     # User Mongoose Schema & UserModel interface
│       ├── users.module.ts    # Users module with Mongoose forFeature
│       └── users.service.ts   # Users service (Skeleton)
└── test/
    └── app.e2e-spec.ts        # Vitest E2E test suite
```
