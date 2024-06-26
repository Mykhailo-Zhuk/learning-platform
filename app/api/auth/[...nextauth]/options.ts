import type { NextAuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchPartOfData } from "@/lib/utils";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    // GitHub provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Your username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await fetchPartOfData("users", credentials?.username);
          const user = await response.json();

          if (
            credentials?.username === user[0].name &&
            credentials?.password === user[0].password
          ) {
            return user[0];
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const merged = {
        ...token,
        ...user,
      };

      return {
        name: merged.name,
        group: merged.group,
        role: merged.role,
        label: merged.label,
      };
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            role: token.role,
            name: token?.name as string,
            label: token.label,
            group: token.group,
          },
        } satisfies Session;
      }

      return session;
    },
  },
};
