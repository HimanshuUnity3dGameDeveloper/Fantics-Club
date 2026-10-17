# 📋 Fantics Club - Backend Task Tracker & Roadmap

**Project:** Fantics Club (Nightlife & VIP Table Reservation API)  
**Location:** `d:\work\fc_app\backend`  
**Tech Stack:** NestJS 12 + TypeScript 6 + MongoDB (Mongoose 9) + Vitest + Oxlint  
**Last Updated:** October 2026  

---

## 📊 1. Current Project Status

- **Overall Backend Completion:** ~50% (Core Setup, Database, Users, Auth Register, & Cities Module Built)
- **Database & Architecture:** ~90% (MongoDB Atlas connected, Mongoose schemas, global ConfigModule, CORS, ValidationPipe)
- **Authentication & Security:** ~45% (Bcrypt registration endpoint live; JWT generation, login endpoint & guards pending)
- **City Management API:** ~90% (`City` model, `CitiesModule`, `findAll`, `findBySlug`, `detectNearestCity` GPS logic complete; detect route exposure & seed data pending)
- **Core Nightlife Domains (Venues, Events, Bookings):** 0% (Next up on the roadmap)
- **Build Status:** ✅ Clean build (`npm run build` compiles with 0 errors)

---

## 🔍 2. Audit of Completed Work

### ✅ Server Entrypoint, CORS & Global Validation (`src/main.ts`)
- [x] Initialized NestJS 12 with ECMAScript Modules (`"type": "module"`).
- [x] Configured TypeScript 6 (`tsconfig.json`, `tsconfig.build.json`) with decorator metadata enabled.
- [x] Configured Oxlint, Prettier, and Vitest test runner.
- [x] **CORS Enabled:** Configured for frontend ports (`http://localhost:8100`, `http://localhost:4200`) with credentials support.
- [x] **Global Validation Pipe:** Activated `new ValidationPipe({ whitelist: true, transform: true })`.
- [x] Dynamic port listening (`process.env.PORT || 3000`).

### ✅ Database Integration (MongoDB Atlas & Mongoose 9)
- [x] Connected to MongoDB Atlas cluster namespace `fc_db` via `MongooseModule.forRootAsync`.
- [x] Global configuration via `@nestjs/config`.

### ✅ User Domain (`src/users`)
- [x] Comprehensive `User` Mongoose schema (`users.model.ts`):
  - `firstName`, `lastName`, `userName` (unique), `email` (unique, lowercase), `mobile` (10-digit regex).
  - `passwordHash` (configured with `select: false`).
  - `role` enum (`'admin' | 'user'`).
  - Profile details (`avatar`, `bio`, `website`, `isProfileComplete`, `active`).
  - Auto timestamps (`createdAt`, `updatedAt`).
- [x] `UsersService` implemented with:
  - `findByEmail(email)`
  - `findByUserName(userName)`
  - `findByMobile(mobile)`
  - `createUser(userData)`
- [x] `UsersModule` registered in `AppModule` and exported.

### ✅ Authentication & Registration (`src/auth`)
- [x] Installed `bcrypt` & `@types/bcrypt`.
- [x] `AuthService.register(data)`:
  - Validates unique email (throws `ConflictException` if exists).
  - Hashes passwords using bcrypt with salt rounds 10.
  - Persists new user in MongoDB Atlas via `UsersService.createUser`.
- [x] `AuthController` route created: `POST /auth/register`.

### ✅ Cities Module (`src/cities`) - *NEW*
- [x] `City` Mongoose schema & `CityModel` interface (`city.model.ts`):
  - `name`, `slug` (unique, lowercase), `description`, `coverImage`.
  - `coordinates`: `{ latitude, longitude }` for GPS auto-detection.
  - `venueCount`, `bookedPercentage`, `minCoverCharge`, `hotspots` array, `active`.
- [x] `CitiesService` implemented with beginner-friendly, clean logic:
  - `findAll()`: Returns all active cities sorted by name.
  - `findBySlug(slug)`: Returns single city details or throws `NotFoundException`.
  - `detectNearestCity(userLat, userLng)`: Validates GPS coordinates and finds nearest active city using Haversine distance formula (`getDistanceInKm`).
- [x] `CitiesController` endpoints:
  - `GET /cities` -> Returns active cities list.
  - `GET /cities/:slug` -> Returns city details by slug.
- [x] `CitiesModule` registered in `AppModule`.

---

## ⚠️ 3. What is Left To Do in Backend (Immediate & Next Steps)

Here is your exact sequential roadmap for remaining backend tasks:

### 🌆 1. Finish Cities Module Details (Quick Win)
- [ ] **Expose Detect Route in `CitiesController`:**
  Add `POST /cities/detect` (or `GET /cities/detect?lat=...&lng=...`) calling `citiesService.detectNearestCity(lat, lng)`.
  *(Note: Must be defined before `@Get(':slug')` so `:slug` does not intercept `detect`)*.
- [ ] **Seed City Data:** Create a seed script or endpoint to insert initial cities (Mumbai `BOM`, Bangalore `BLR`, Hyderabad `HYD`, Chennai `MAA`) with real coordinates and image paths.

---

### 🔐 2. Complete Authentication & JWT Flow (`/auth`)
- [ ] **Install Packages:**
  ```bash
  npm install @nestjs/jwt @nestjs/passport passport passport-jwt class-validator class-transformer
  npm install -D @types/passport-jwt
  ```
- [ ] **Create DTOs in `src/auth/dto/`:**
  - `RegisterDto` (validations for email, password length >= 6, 10-digit mobile, firstName, lastName).
  - `LoginDto` (email/mobile + password).
- [ ] **Implement `POST /auth/login`:**
  - Verify user exists and check password with `bcrypt.compare(password, user.passwordHash)`.
  - Generate and return signed JWT Access Token (`{ accessToken, user }`).
- [ ] **Implement `JwtStrategy` & `JwtAuthGuard`:**
  - Protect authenticated endpoints.
  - Custom `@CurrentUser()` parameter decorator to extract logged-in user in controllers.
- [ ] **Implement `GET /auth/me`:**
  - Returns currently authenticated user's profile.
- [ ] *(Optional)* Mobile OTP endpoints: `POST /auth/send-otp` & `POST /auth/verify-otp`.

---

### 🍸 3. Venues & Clubs Directory Module (`/venues`)
*(Powers Frontend Explore tab vibe cards & club listings)*
- [ ] Create `VenuesModule`, `VenuesController`, `VenuesService`.
- [ ] Define `Venue` Mongoose Schema (`src/venues/venue.model.ts`):
  - `name`, `cityId` (reference: City), `slug`.
  - `vibeCategory`: enum (`'clubbing' | 'lounge' | 'rooftop' | 'fine_dining'`).
  - `coverCharge`, `minTableSpend`.
  - `heroImage`, `gallery` (images array).
  - `address`, `mapUrl`, `coordinates`.
  - `rating`, `reviewCount`, `operatingHours`, `dressCode`, `featured`.
- [ ] Implement Endpoints:
  - `GET /venues?city=:cityId&vibe=:vibe` (Filtered list of clubs).
  - `GET /venues/:id` (Full venue profile & table layout details).
  - `POST /venues` (Admin: add venue).

---

### 🎧 4. Events & DJ Lineups Module (`/events`)
*(Powers Frontend `/home/lineups` tab)*
- [ ] Create `EventsModule`, `EventsController`, `EventsService`.
- [ ] Define `Event` Mongoose Schema (`src/events/event.model.ts`):
  - `title` (e.g. *E11EVEN Rooftop Sunrise Sessions*).
  - `venueId` (reference: Venue).
  - `headliner` (e.g. *Kygo*, *Steve Aoki*, *Tiësto*).
  - `genre` (Deep House, Hip-Hop, EDM).
  - `eventDate` (Date), `startTime` ("11:00 PM").
  - `ticketPrice`, `originalPrice`, `offerTag` ("25% Flash Drop").
  - `urgencyText` ("95% Full", "Only 3 Tables Left").
  - `isFeatured` (boolean).
- [ ] Implement Endpoints:
  - `GET /events?date=YYYY-MM-DD` (Date-specific lineup list).
  - `GET /events/featured` (Headline banner for top of LineUp tab).
  - `GET /venues/:venueId/events` (Events at a specific club).

---

### 🎟️ 5. VIP Tables & Reservations / Passes Module (`/bookings`)
*(Powers Frontend `/home/table` reservation screen & `/home/passes` tab)*
- [ ] Create `BookingsModule`, `BookingsController`, `BookingsService`.
- [ ] Define `Booking` Mongoose Schema (`src/bookings/booking.model.ts`):
  - `userId` (reference: User), `venueId` (reference: Venue), `eventId` (optional).
  - `bookingType`: enum (`'table' | 'guestlist' | 'stag' | 'couple'`).
  - `zone`: enum (`'mezzanine' | 'front_stage' | 'terrace' | 'solo_bar'`).
  - `tableNumber` (e.g. `#M-04`, `#S-01`).
  - `bookingDate`, `guestCount` (`{ men, women, couples }`).
  - `baseCost`, `isVipDiscountApplied`, `totalAmount`.
  - `status`: enum (`'pending' | 'confirmed' | 'cancelled' | 'checked_in'`).
  - `qrCodeToken` (Unique secure string for door entry QR scanner).
- [ ] Implement Endpoints:
  - `POST /bookings` (Protected: create VIP table lock / booking).
  - `GET /bookings/my-passes` (Protected: list user's passes).
  - `GET /bookings/:id` (Pass details with QR payload).
  - `POST /bookings/verify-pass` (Bouncer pass validation scanner).
