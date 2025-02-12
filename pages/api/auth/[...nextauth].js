import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { mongooseConnect } from "@/lib/mongoose";
// tutaj tworze session
export const authOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        await mongooseConnect();
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
          return {
            // jesli uzytkownik istnieje i haslo sie zgadza to zwraca dane uzytkownika
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  // JWT callback functions
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // tworzenie sesji
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
