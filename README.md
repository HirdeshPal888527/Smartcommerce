# 🛒 SmartCommerce

A full-stack MERN E-Commerce platform built with a scalable layered architecture featuring dedicated **Buyer**, **Seller**, and **Admin** portals.

The project focuses on real-world software engineering practices including authentication, role-based authorization, product management, order processing, Redis caching, Meilisearch integration, Cloudinary image uploads, and Dockerized development.

---

# 📸 Screenshots

> *(Add screenshots after deployment)*

| Customer | Seller | Admin |
|----------|---------|-------|
| Home | Dashboard | Dashboard |
| Product Details | Product Management | User Management |
| Cart | Analytics | Product Moderation |
| Checkout | Orders | Order Management |

---

# ✨ Features

## 👤 Buyer

- User Registration & Login
- JWT Authentication
- Product Browsing
- Product Search (Meilisearch)
- Product Details
- Shopping Cart
- Wishlist
- Checkout
- Mock Payment Gateway
- Order History
- Order Details

---

## 🛍 Seller

- Seller Dashboard
- Product CRUD
- Cloudinary Image Upload
- Dynamic Product Specifications
- Dynamic Product Variants
- Product Analytics
- Seller Orders
- Seller Navigation Layout

---

## 🛠 Admin

- Admin Dashboard
- User Management
- Product Moderation
- Order Management
- Admin Navigation Layout

---

## ⚙ Backend

- JWT Authentication
- Role-Based Authorization
- Service Layer Architecture
- Global Error Handling
- Async Middleware
- Redis Response Caching
- Meilisearch Integration
- Cloudinary Integration
- Dockerized Services

---

# 🏗 Architecture

```
React (Vite)
        │
        ▼
Axios API Layer
        │
        ▼
Express.js
        │
        ▼
Controllers
        │
        ▼
Service Layer
        │
        ▼
MongoDB
```

Additional Services

```
Redis
Meilisearch
Cloudinary
Docker
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Zustand
- Axios
- Tailwind CSS
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Cloudinary

---

## DevOps

- Docker
- Docker Compose
- Redis
- Meilisearch

---

# 📂 Folder Structure

```
SmartCommerce
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   └── utils/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│
├── docs/
│
└── docker-compose.yml
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/HirdeshPal888527/Smartcommerce.git

cd Smartcommerce
```

---

## Backend

```bash
cd server

npm install
```

---

Create `.env`

```env
PORT=

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=

CLIENT_URL=

REDIS_URL=

MEILISEARCH_HOST=

MEILISEARCH_API_KEY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Start backend

```bash
npm run dev
```

---

## Frontend

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=
```

Start frontend

```bash
npm run dev
```

---

# 🐳 Docker

Start Docker services

```bash
docker compose up -d
```

Services

- MongoDB
- Redis
- Meilisearch

---

# 🔑 Environment Variables

## Backend

| Variable | Description |
|-----------|-------------|
| PORT | Backend Port |
| MONGODB_URI | MongoDB Connection String |
| JWT_SECRET | JWT Secret |
| JWT_EXPIRES_IN | JWT Expiration |
| CLIENT_URL | Frontend URL |
| REDIS_URL | Redis Connection |
| MEILISEARCH_HOST | Meilisearch URL |
| MEILISEARCH_API_KEY | Meilisearch API Key |
| CLOUDINARY_CLOUD_NAME | Cloudinary Name |
| CLOUDINARY_API_KEY | Cloudinary API Key |
| CLOUDINARY_API_SECRET | Cloudinary Secret |

---

## Frontend

| Variable | Description |
|-----------|-------------|
| VITE_API_URL | Backend API URL |

---

# 📡 API Overview

## Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

---

## Products

```
GET
POST
PUT
DELETE
```

---

## Cart

```
Add Item

Update Quantity

Remove Item

Clear Cart
```

---

## Wishlist

```
Add

Remove

Get Wishlist
```

---

## Orders

```
Create Order

Get Orders

Get Order Details
```

---

## Seller

```
Dashboard

Products

Orders

Analytics
```

---

## Admin

```
Dashboard

Users

Products

Orders
```

---

# 📈 Project Highlights

- Layered Backend Architecture
- Role-Based Access Control
- Redis Caching
- Meilisearch Search
- Cloudinary Image Management
- Dockerized Local Development
- Modular Frontend using Zustand
- Responsive Seller & Admin Dashboards

---

# 🔮 Future Improvements

- Profile Editing
- Change Password
- Cloudinary Cleanup after Image Replacement
- Advanced Search & Filters
- Pagination
- Email Notifications
- Payment Gateway Integration (Production)

---

# 👨‍💻 Author

**Hirdesh Pal**

GitHub

https://github.com/HirdeshPal888527

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.