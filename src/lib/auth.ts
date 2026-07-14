import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Role, Status } from "@prisma/client";
import { z } from "zod";

declare module "next-auth" {
interface Session {
user: {
id: string;
role: Role;
status: Status;
name: string;
email: string;
} & DefaultSession["user"];
}
interface User {
id: string;
role: Role;
status: Status;
name: string;
email: string;
}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
session: { strategy: "jwt" },
providers: [
Credentials({
name: "Credentials",
credentials: {
email: { label: "Email", type: "email" },
password: { label: "Password", type: "password" }
},
async authorize(creds) {
const schema = z.object({
email: z.string().email(),
password: z.string().min(6)
});
const parsed = schema.safeParse(creds);
if (!parsed.success) return null;

const user = await prisma.user.findUnique({
where: { email: parsed.data.email }
});
if (!user) return null;
if (user.status === "DISABLED") return null;

const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
if (!ok) return null;

return {
id: user.id,
name: user.name,
email: user.email,
role: user.role,
status: user.status
};
}
})
],
pages: { signIn: "/login" },
callbacks: {
async jwt({ token, user }) {
if (user) {
// @ts-ignore
token.id = user.id;
// @ts-ignore
token.role = user.role;
// @ts-ignore
token.status = user.status;
}
return token;
},
async session({ session, token }) {
if (session.user) {
// @ts-ignore
session.user.id = token.id as string;
// @ts-ignore
session.user.role = token.role;
// @ts-ignore
session.user.status = token.status;
}
return session;
}
}
});