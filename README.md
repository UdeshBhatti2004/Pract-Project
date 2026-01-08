# Next.js Practice Project

A **full-stack Next.js (App Router)** project focused on practicing real-world authentication flows, backend integration, and production-grade patterns. This repository is primarily used for **learning by building**, debugging real issues, and understanding how different parts of a modern web stack work together.

---

## 🚀 Live Demo

👉 **https://pract-project-production.up.railway.app/**

> Deployed on **Railway** for stable, always-on access without ISP-specific platform domain issues.

---

## 🧰 Tech Stack

* **Next.js** (App Router)
* **TypeScript**
* **NextAuth** (Credentials + Google OAuth)
* **MongoDB Atlas**
* **Mongoose**
* **Cloudinary** (image uploads)
* **Axios**
* **Deployment**: Railway

---

## ✨ Features

* Full-stack architecture using Next.js API routes
* Server-side rendering (SSR)
* Authentication with Credentials & Google OAuth
* JWT-based session strategy
* Protected routes using middleware
* Profile management with persistent image uploads
* Responsive UI

---

## 📦 Getting Started (Local Development)

### Prerequisites

* Node.js **18+**
* npm / yarn / pnpm

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Locally

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🚢 Deployment (Railway)

### Required Scripts (`package.json`)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

### Steps

1. Create a new project on Railway
2. Deploy from GitHub
3. Add environment variables in **Railway → Variables**
4. Generate a public domain in **Railway → Settings → Domains**

Railway will automatically build and start the app.

---

## 🚀 Progress (So Far)

### Backend & Database

* Created a **User schema** using Mongoose + TypeScript
* Connected application to **MongoDB Atlas**
* Implemented a **cached MongoDB connection** to prevent multiple connections in development
* Safely reused Mongoose models to avoid `OverwriteModelError` during hot reload
* Built secure API routes using the App Router

### Authentication

* Set up authentication using **NextAuth**
* Implemented **Credentials Provider** (email & password)
* Implemented **Google OAuth**
* Used **JWT-based session strategy**
* Extended **session and token types** with TypeScript
* Synced user data across Database, JWT, and Client session
* Ensured database values take priority over OAuth provider values

### Profile Management

* Built **Edit Profile** feature
* Update user name and profile image
* Secure image upload using **Cloudinary**
* Stored permanent HTTPS image URLs in the database
* Profile image persists across refresh, re-login, server restart, and Google sign-in
* Instant session update using `session.update()` + JWT sync

### Authorization & Middleware

* Middleware-based route protection
* Public routes: login, register, auth
* Redirect unauthenticated users with callback URLs
* Protected authenticated routes using session tokens

### Frontend

* Login and Register pages
* Sign Out functionality
* Home page using session data
* Immediate UI updates after profile changes
* `next/image` integration with Google & Cloudinary

---

## 🧠 Key Learnings

* Blob URLs are **temporary** and should never be stored in a database
* Next.js API routes default to **Edge runtime**, which does not support `Buffer`
* Secure uploads require forcing **Node.js runtime**
* External images must be explicitly allowed in `next.config.ts`
* Session updates require proper handling inside **NextAuth JWT callbacks**
* OAuth provider data should not blindly override database values

---

## 📌 Status

✅ **Completed** — The core features are fully implemented and stable.

The application is deployed on **Railway** to provide reliable, region-independent access without platform-domain restrictions.

---

## 🙌 Author

**Udesh Bhatti**

* GitHub: [https://github.com/UdeshBhatti2004](https://github.com/UdeshBhatti2004)
