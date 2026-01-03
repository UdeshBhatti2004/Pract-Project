import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { experimental_taintUniqueValue } from "react";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentails",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email or password not found");
        }

        await connectDb();

        let user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        await connectDb();

        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
          });
        }

        user.id = existingUser._id.toString();
      }

      return true;
    },

    // Entering user detail in token
    async jwt({ token, user }) {
      if (user) {
        (token.id = user.id), (token.name = user.name);
        (token.email = user.email), (token.image = user.image);
      }

      return token;
    },

    //Entering user detail in session

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
export default authOptions;
