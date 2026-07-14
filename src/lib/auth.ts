import type { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Role, Status } from "@prisma/client";
import { z } from "zod";

declare module "next-auth" {interface Session {user: {id: string;role: Role;status: Status;name: string;email: string;} & DefaultSession["user"];}
}

export const authOptions: NextAuthOptions = {session: { strategy: "jwt" },providers: [CredentialsProvider({name: "Credentials",credentials: {email: { label: "Email", type: "email" },password: { label: "Password", type: "password" }},async authorize(creds) {const schema = z.object({email: z.string().email(),password: z.string().min(6)});const parsed = schema.safeParse(creds);if (!parsed.success) return null;

const user = await prisma.user.findUnique({where: { email: parsed.data.email }});if (!user) return null;if (user.status === "DISABLED") return null;

const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);if (!ok) return null;

return {id: user.id,name: user.name,email: user.email,role: user.role,status: user.status} as any;}})],pages: { signIn: "/login" },callbacks: {async jwt({ token, user }) {if (user) {token.id = (user as any).id;(token as any).role = (user as any).role;(token as any).status = (user as any).status;}return token;},async session({ session, token }) {if (session.user) {(session.user as any).id = token.id as string;(session.user as any).role = (token as any).role;(session.user as any).status = (token as any).status;}return session;}}
};

export const getAuthSession = () => getServerSession(authOptions);