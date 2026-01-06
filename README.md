This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Next.js Practice Project

Work-in-progress **Next.js App Router** project focused on practicing real-world full-stack concepts, authentication flows, and production-grade patterns.

This repository is primarily used for **learning by building**, debugging real issues, and understanding how different parts of a modern web stack work together.

---

## 🚀 Progress (so far)

### Backend & Database
- Created a **User schema** using Mongoose + TypeScript
- Connected application to **MongoDB Atlas**
- Implemented a **cached MongoDB connection** to prevent multiple connections in development
- Safely reused Mongoose models to avoid `OverwriteModelError` during hot reload
- Built secure API routes using the App Router

---

### Authentication
- Set up authentication using **NextAuth**
- Implemented **Credentials Provider** (email & password)
- Implemented **Google OAuth**
- Used **JWT-based session strategy**
- Extended **session and token types** with TypeScript
- Synced user data across:
  - Database
  - JWT
  - Client session
- Ensured database values always take priority over OAuth provider values

---

### Profile Management
- Built **Edit Profile** feature
  - Update user name
  - Update profile image
- Implemented **secure image upload using Cloudinary**
- Stored **permanent HTTPS image URLs** in the database (no blob URLs)
- Ensured profile image persists across:
  - Page refresh
  - Logout / login
  - Server restart
  - Google sign-in
- Updated session instantly using `session.update()` + JWT sync

---

### Authorization & Middleware
- Added **middleware-based route protection**
- Defined public routes (login, register, auth)
- Redirected unauthenticated users to login with callback URL
- Protected authenticated routes using session tokens

---

### Frontend
- Built **Login** and **Register** pages
- Implemented **Sign Out**
- Built **Home page** using session data
- Displayed authenticated user information
- Reflected profile updates immediately via session/JWT sync
- Integrated `next/image` with external providers (Google & Cloudinary)

---

## 🧠 Key Learnings
- Blob URLs are **temporary** and should never be stored in a database
- Next.js API routes default to **Edge runtime**, which does not support `Buffer`
- Secure uploads require forcing **Node.js runtime**
- External images must be explicitly allowed in `next.config.ts`
- Session updates require proper handling inside **NextAuth JWT callbacks**
- OAuth provider data should not blindly override database values

---

## 🛠️ Tech Stack
- Next.js (App Router)
- TypeScript
- NextAuth
- MongoDB Atlas
- Mongoose
- Cloudinary
- Axios

---

## 📌 Status
🚧 **In progress** — features are being added incrementally while focusing on correctness, persistence, and real-world edge cases.
