import { redirect } from "next/navigation";
import { getAuthSession } from "../../lib/auth";

export default async function MePage() {const session = await getAuthSession();if (!session) redirect("/login");if ((session.user as any).role === "ADMIN") redirect("/admin");

const u = session.user as any;

return (<div style={{ padding: 24, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}><h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>بياناتي</h1>

<divstyle={{display: "grid",gap: 12,gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",marginBottom: 16}}><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>الاسم</div><div style={{ fontWeight: 600 }}>{u?.name}</div></div><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>البريد</div><div style={{ fontWeight: 600 }}>{u?.email}</div></div><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>الدور</div><div style={{ fontWeight: 600 }}>{u?.role}</div></div><div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}><div style={{ color: "#6b7280", fontSize: 12 }}>الحالة</div><div style={{ fontWeight: 600 }}>{u?.status}</div></div></div>

<p>تم تسجيل الدخول بنجاح.</p>

<div style={{ marginTop: 16 }}><ahref="/api/auth/session"target="_blank"style={{ padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8 }}>عرض الجلسة
</a>
</div>
);
}