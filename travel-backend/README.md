# ✈️ Travel Booking Backend API

A full-featured REST API for a travel booking website, built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd travel-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Stripe key
```

### 3. Start the server
```bash
npm run dev       # development (with auto-reload)
npm start         # production
```

---

## 📁 Project Structure

```
travel-backend/
├── server.js               # Entry point
├── .env.example            # Environment variables template
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── User.js             # User schema
│   ├── Flight.js           # Flight schema
│   ├── Hotel.js            # Hotel schema
│   └── Booking.js          # Booking schema
├── controllers/
│   ├── authController.js
│   ├── flightController.js
│   ├── hotelController.js
│   ├── bookingController.js
│   └── paymentController.js
├── routes/
│   ├── auth.js
│   ├── flights.js
│   ├── hotels.js
│   ├── bookings.js
│   ├── payments.js
│   └── admin.js
└── middleware/
    └── auth.js             # JWT protect + adminOnly
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | Protected | Get current user |
| PUT | `/api/auth/profile` | Protected | Update profile |

### Flights
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/flights/search?from=MAA&to=DEL&date=2024-12-01&class=economy` | Public | Search flights |
| GET | `/api/flights/:id` | Public | Get flight details |
| POST | `/api/flights` | Admin | Add new flight |
| PUT | `/api/flights/:id` | Admin | Update flight |
| DELETE | `/api/flights/:id` | Admin | Delete flight |

### Hotels
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/hotels/search?city=Goa` | Public | Search hotels |
| GET | `/api/hotels/:id` | Public | Get hotel details |
| POST | `/api/hotels` | Admin | Add new hotel |
| PUT | `/api/hotels/:id` | Admin | Update hotel |
| DELETE | `/api/hotels/:id` | Admin | Delete hotel |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/bookings` | Protected | Create booking |
| GET | `/api/bookings/my` | Protected | My bookings |
| GET | `/api/bookings/:id` | Protected | Booking details |
| PUT | `/api/bookings/:id/cancel` | Protected | Cancel booking |

### Payments (Stripe)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/payments/create-intent` | Protected | Create Stripe payment intent |
| POST | `/api/payments/confirm` | Protected | Confirm payment |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/admin/bookings` | Admin | All bookings |
| GET | `/api/admin/users` | Admin | All users |

---

## 🔐 Authentication

Use **Bearer token** in headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## 💳 Payment Flow (Stripe)

1. Create booking → get `bookingId`
2. Call `/api/payments/create-intent` → get `clientSecret`
3. Use Stripe.js on frontend to confirm payment with `clientSecret`
4. Call `/api/payments/confirm` with `bookingId` + `paymentIntentId`

---

## 🗄️ Connect to Your Frontend

In your React/frontend app, set:
```js
const API_URL = "http://localhost:5000/api";
```

Example fetch call:
```js
const res = await fetch(`${API_URL}/flights/search?from=MAA&to=DEL&date=2024-12-01`);
const data = await res.json();
```
