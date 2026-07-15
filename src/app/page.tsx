import { getAuthSession } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Index() {const session = await getAuthSession();if (!session) redirect("/login");if ((session.user as any).role === "ADMIN") redirect("/admin");redirect("/me");
}