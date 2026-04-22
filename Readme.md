# BidSmart — Intelligent E-Tender Management System

<div align="center">



![BidSmart Banner](https://img.shields.io/badge/BidSmart-AI%20Powered%20E--Tender%20Platform-1A6BFF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTVMMTIgMnpNMiAxN2wxMCA1IDEwLTVNMiAxMmwxMCA1IDEwLTUiLz48L3N2Zz4=)



**AI-powered government tender discovery and bid management platform built for Indian vendors**

[

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)

](https://react.dev)
[

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)

](https://nodejs.org)
[

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)

](https://mongodb.com)
[

![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

](https://tailwindcss.com)
[

![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

](LICENSE)
[

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

]()

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