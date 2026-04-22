# BidSmart — Intelligent E-Tender Management System

<div align="center">

![BidSmart Banner](https://img.shields.io/badge/BidSmart-AI%20Powered%20E--Tender%20Platform-1A6BFF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTVMMTIgMnpNMiAxN2wxMCA1IDEwLTVNMiAxMmwxMCA1IDEwLTUiLz48L3N2Zz4=)

**AI-powered government tender discovery and bid management platform built for Indian vendors**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()

[Features](#features) · [Demo](#demo) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [API Docs](#api-documentation) · [Screenshots](#screenshots)

</div>

---

## Overview

**BidSmart** is a full-stack web application developed as part of a 6th Semester B.C.A.C.S training project at **Babu Banarasi Das University, Lucknow** under the guidance of **Yuvraj Singh** at **UV Tech**.

The platform addresses a real problem faced by Indian vendors — discovering and bidding on relevant government tenders is a fragmented process, scattered across dozens of portals and lacking intelligence. BidSmart centralizes this with an **AI-powered recommendation engine**, secure bid submission, real-time email notifications, and comprehensive dashboards for both vendors and administrators.

> Built for Indian government contractors and procurement teams.

---

## Features

### AI Recommendation Engine
- Analyzes vendor profile (category, location, expertise, average bid amount)
- Scores every active tender on four parameters — category match, state match, budget fit, and deadline comfort
- Displays top five personalized tender matches with match percentage and reasoning

### Secure Authentication
- JWT-based authentication with 7-day token expiry
- bcrypt password hashing (salt rounds: 10)
- Role-based access control — Vendor and Admin roles
- Complete Forgot Password flow with 6-digit email OTP (10-minute expiry)

### Tender Management (Admin)
- Create, publish, edit, and close tenders
- Automatic email and in-app notifications sent to all matching vendors upon publish
- Category-wise analytics and activity feed
- Review and approve or reject bids with a single action

### Bid Submission (Vendor)
- Browse and search tenders with filters (category, state, budget)
- Submit bids with quoted amount before deadline
- Withdraw pending bids
- Track all bid statuses — Pending, Accepted, Rejected, Withdrawn

### Email Notifications
- Welcome email on registration
- New tender alert when a matching tender is published
- Bid confirmation on submission
- Bid accepted or rejected notifications
- Password reset OTP email

### Analytics Dashboards
- **Vendor:** Win rate, total bids, contract value, bid history, and AI recommendations
- **Admin:** Total tenders, active tenders, registered vendors, bids received, category breakdown pie chart, and live activity feed

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Axios, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas), Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **Email Service** | Nodemailer (Gmail SMTP) |
| **Security** | Helmet, CORS, Express Validator |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas |

---

## Project Structure
BidSmart/
├── frontend/
│   ├── public/
│   │   └── hero.png
│   ├── src/
│   │   ├── page/
│   │   │   ├── LandPage.jsx        # Landing page
│   │   │   ├── AuthPage.jsx        # Login & Register
│   │   │   ├── VendorDashboard.jsx # Vendor dashboard
│   │   │   └── AdminDashboard.jsx  # Admin dashboard
│   │   ├── services/
│   │   │   └── api.js              # Axios API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── backend/
├── models/
│   ├── User.js
│   ├── Tender.js
│   ├── Bid.js
│   └── Notification.js
├── routes/
│   ├── auth.routes.js
│   ├── tender.routes.js
│   ├── bid.routes.js
│   ├── recommendation.routes.js
│   ├── notification.routes.js
│   └── admin.routes.js
├── middleware/
│   └── auth.middleware.js
├── utils/
│   └── email.js
├── createAdmin.js              # Seed script
├── server.js
├── .env.example
└── package.json

---

## Getting Started

### Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A [MongoDB Atlas](https://mongodb.com/atlas) free account
- A Gmail account with [App Password](https://myaccount.google.com/apppasswords) enabled

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/BidSmart.git
cd BidSmart
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bidsmart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
```

> **Note:** Never commit your `.env` file. It is already included in `.gitignore`.

Start the backend:

```bash
npm start
```

Expected output:
MongoDB Connected
Server running on port 5000

---

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Expected output:
Local: http://localhost:3000

---

### 4. Seed Test Data

To create test admin and vendor accounts with dummy tenders and bids:

```bash
cd backend
node createAdmin.js
```

Expected output:
MongoDB Connected
Old data cleared
Admin created
Vendor created
Tenders inserted
Bids inserted
Notifications inserted
============================
SEED COMPLETE
Admin Login:
Email: rishabhsingh.block@gmail.com
Password: rishu123
Vendor Login:
Email: vendor@bidsmart.in
Password: vendor123

---

### 5. Open in Browser

Navigate to **http://localhost:3000**

---

## Test Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | rishabhsingh.block@gmail.com | rishu123 |
| **Vendor** | vendor@bidsmart.in | vendor123 |

---

## API Documentation

### Base URL
http://localhost:5000/api

### Auth Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register new user |
| POST | `/auth/login` | Public | Login and get JWT |
| GET | `/auth/me` | Protected | Get current user |
| POST | `/auth/forgot-password` | Public | Send OTP to email |
| POST | `/auth/verify-reset-code` | Public | Verify OTP code |
| POST | `/auth/reset-password` | Public | Set new password |

### Tender Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/tenders` | Public | Get all active tenders |
| GET | `/tenders/:id` | Public | Get single tender |
| POST | `/tenders` | Admin | Create new tender |
| PUT | `/tenders/:id` | Admin | Update tender |

### Bid Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/bids` | Vendor | Submit a bid |
| GET | `/bids/my` | Vendor | Get my bids |
| PUT | `/bids/:id/withdraw` | Vendor | Withdraw a bid |
| GET | `/bids/tender/:id` | Admin | Get bids for tender |
| PUT | `/bids/:id/status` | Admin | Accept or reject bid |

### Other Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/recommendations` | Vendor | Get AI recommendations |
| GET | `/notifications` | Protected | Get notifications |
| PUT | `/notifications/:id/read` | Protected | Mark as read |
| GET | `/admin/stats` | Admin | Get platform stats |
| GET | `/admin/users` | Admin | Get all vendors |

---

## Database Schema

### Users
name, email, password (hashed), company_name, role,
category, state, experience, gst_number, pan_number,
phone, avg_bid_amount, status, timestamps

### Tenders
title, description, category, state, estimated_cost,
start_date, end_date, status, created_by (ref: User), timestamps

### Bids
tender_id (ref: Tender), user_id (ref: User),
quoted_amount, status, documents, submitted_at, timestamps

### Notifications
user_id (ref: User), message, type, is_read, timestamps

---

## AI Recommendation Algorithm

The recommendation engine scores each tender out of **100 points**:

| Parameter | Points | Logic |
|---|---|---|
| **Category Match** | 40 pts | Exact match = 40, Related = 20, No match = 0 |
| **State Match** | 25 pts | Same state = 25, Different = 0 |
| **Budget Fit** | 20 pts | Within 20% of avg bid = 20, Within 50% = 10 |
| **Deadline Comfort** | 15 pts | 30+ days = 15, 15–30 days = 8, Under 15 = 0 |

The top five tenders are returned with score and match reasoning.

---

## Deployment

### Frontend — Vercel

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend — Render

1. Push the backend to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add all `.env` variables in the Render dashboard

### Database — MongoDB Atlas

Already configured during local development. Ensure `0.0.0.0/0` is whitelisted in Atlas Network Access for Render's dynamic IPs.

---

## Known Limitations

- AI recommendations use rule-based scoring, not machine learning
- Google Sign-In is UI-only and not fully implemented
- English language only — no regional language support
- Free hosting tiers limit concurrent users
- No payment gateway integration
- Tenders must be entered manually — no GEM portal integration

---

## Development Timeline

| Week | Milestone |
|---|---|
| 1–2 | Requirement analysis, wireframes, database schema design |
| 3–4 | React and Node.js fundamentals, development environment setup |
| 5–6 | User authentication, landing page, basic routing |
| 7–8 | Tender management, bid submission, admin panel |
| 9–10 | AI recommendations, analytics dashboard, notifications |
| 11–12 | Bug fixes, performance optimization, security testing |
| 13 | Deployment, documentation, presentation |

---

## Author

**Rishabh Singh**
- Enrollment No: 12302640086
- B.C.A.C.S — 6th Semester
- Babu Banarasi Das University, Lucknow
- Training at UV Tech under **Yuvraj Singh**
- Contact: rishabhsingh.block@gmail.com

---

## Acknowledgements

- [Babu Banarasi Das University](https://bbdu.ac.in) for academic support
- **Yuvraj Singh** — Project Guide, UV Tech
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://mongodb.com/docs)
- [Node.js Documentation](https://nodejs.org)
- [Traversy Media](https://youtube.com/@TraversyMedia) — React and Node.js tutorials
- [freeCodeCamp](https://freecodecamp.org) — Full Stack Development resources

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**BidSmart** · Babu Banarasi Das University · 2025–2026

</div>