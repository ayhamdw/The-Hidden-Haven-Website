import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut } from "next-auth/react";
import { createGuest, getGuest } from "./data-service";

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
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          const newGuest = createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authConfig);
export { signIn, signOut, handler as GET, handler as POST };
