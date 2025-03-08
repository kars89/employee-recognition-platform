import { getServerSession } from "next-auth/next"
import type { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// Create a custom adapter with event handlers
const customPrismaAdapter = () => {
  // Start with the standard PrismaAdapter
  const standardAdapter = PrismaAdapter(prisma)
  
  return {
    ...standardAdapter,
    createUser: async (userData) => {
      // First, try to find the default employee role
      let defaultRole = await prisma.role.findFirst({
        where: { name: "employee" },
      })
      
      // If the role doesn't exist, create it
      if (!defaultRole) {
        defaultRole = await prisma.role.create({
          data: {
            name: "employee",
            permissions: [],
          },
        })
      }
      
      // Create the user with the role relationship
      return prisma.user.create({
        data: {
          ...userData,
          role: { connect: { id: defaultRole.id } },
        },
      })
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: customPrismaAdapter(),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // For JWT strategy, token is available but user might be undefined
      // Get userId from either user object or token
      const userId = user?.id || token?.sub;
      
      if (!userId) {
        // If no userId is available, return session as is
        return session;
      }
      
      try {
        // Get user role from database
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          include: { role: true },
        });

        return {
          ...session,
          user: {
            ...session.user,
            id: userId,
            role: dbUser?.role?.name || "employee",
          },
        };
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.sub = user.id // Ensure sub is set consistently

        try {
          // Get user role from database
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: { role: true },
          })

          token.role = dbUser?.role?.name || "employee"
        } catch (error) {
          console.error("Error fetching user role in JWT callback:", error)
          // Set default role if there's an error
          token.role = "employee"
        }
      }
      return token
    },
  },
  events: {
    createUser: async (message) => {
      // Log when a user is created
      console.log("New user created:", message.user.email)
    },
    signIn: async (message) => {
      // Log sign-in activity
      console.log("User signed in:", message.user.email)
    },
    signOut: async (message) => {
      // Log sign-out activity
      console.log("User signed out")
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
}

export const getAuthSession = () => getServerSession(authOptions)

