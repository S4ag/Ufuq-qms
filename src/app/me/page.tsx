import { redirect } from "next/navigation";
import { getAuthSession } from "../../lib/auth";

export default async function MePage() {const session = await getAuthSession();if (!session) redirect("/login");if ((session.user as any).role === "ADMIN") redirect("/admin");

const u = session.user as any;

return (<main dir="rtl" style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>بياناتي</h1><ul style={{ lineHeight: 1.8 }}><li>الاسم: {u?.name}</li><li>البريد: {u?.email}</li><li>الدور: {u?.role}</li><li>الحالة: {u?.status}</li></ul><p style={{ marginTop: 16 }}><a href="/api/auth/session" target="_blank">عرض الجلسة</a></p></main>);
}