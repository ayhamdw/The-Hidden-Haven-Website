import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut } from "next-auth/react";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authConfig);
export { signIn, signOut, handler as GET, handler as POST };
