import NextAuth, { NextAuthOptions, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

declare module "next-auth" {
    interface User extends DefaultUser {
        role?: string;
    }
}
import { User } from "../../../../models/user";
import { Model } from 'mongoose';
import { dbConnect } from "../../../../utils/dbConfig";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  password?: string;
  role?: string;
}

export { User };

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
            await dbConnect();
    
            if (!credentials?.email || !credentials?.password) {
                console.error('Missing credentials:', credentials);
                throw new Error('Please provide email and password');
            }
    
            const user = await (User as Model<IUser>).findOne({ email: credentials.email.toLowerCase() }).select('+password').lean();
            console.log('User found:', user);
    
            if (!user) {
                throw new Error('No user found with this email');
            }
    
            if (!user.password) {
                console.error('Password field missing in user:', user);
                throw new Error('Invalid user data');
            }
    
            const isPasswordValid = await compare(credentials.password, user.password);
            console.log('Password valid:', isPasswordValid);
    
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
    
            return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role
            };
        } catch (error) {
            console.error('Error during authorization:', error);
            throw error;
        }
    }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
