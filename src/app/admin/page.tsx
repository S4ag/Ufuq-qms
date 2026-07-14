import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {const session = await getAuthSession();if (!session) redirect("/login");if ((session.user as any).role !== "ADMIN") redirect("/me");

const [empCount, branchCount, visitCount] = await Promise.all([prisma.user.count({ where: { role: "EMPLOYEE" } }),prisma.branch.count(),prisma.visit.count()]);

return (<div style={{ padding: 24, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>لوحة الإدارة</h1><div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: 16 }}><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>عدد الموظفين</div><div style={{ fontSize: 24, fontWeight: 700 }}>{empCount}</div></div><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>عدد الفروع</div><div style={{ fontSize: 24, fontWeight: 700 }}>{branchCount}</div></div><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>عدد الزيارات</div><div style={{ fontSize: 24, fontWeight: 700 }}>{visitCount}</div></div></div>

<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><a href="/me" style={{ padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8 }}>صفحة الموظف</a><a href="/api/auth/session" target="_blank" style={{ padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8 }}>الجلسة</a><a href="/login" style={{ padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8 }}>تسجيل الدخول</a></div></div>);
}