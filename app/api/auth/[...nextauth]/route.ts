import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// Create a handler for NextAuth requests
const handler = NextAuth(authOptions);

// Export the handler as GET and POST methods
export { handler as GET, handler as POST };
