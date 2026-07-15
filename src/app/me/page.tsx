import { redirect } from "next/navigation";
import { getAuthSession } from "../../lib/auth";

export default async function MePage() {
const session = await getAuthSession();
if (!session) redirect("/login");
if ((session.user as any).role === "ADMIN") redirect("/admin");

// استيراد ديناميكي لتفادي أخطاء البناء
const { prisma } = await import("../../lib/prisma");

const user = await prisma.user.findUnique({
where: { id: (session.user as any).id },
include: { assignments: { include: { branch: true } } }
});

return (
<main dir="rtl" style={{ padding: 24, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
<h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>بياناتي</h1>

<section
style={{
display: "grid",
gap: 12,
gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
marginBottom: 16
}}
>
<div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
<div style={{ color: "#6b7280", fontSize: 12 }}>الاسم</div>
<div style={{ fontWeight: 600 }}>{user?.name}</div>
</div>
<div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
<div style={{ color: "#6b7280", fontSize: 12 }}>رقم الموظف</div>
<div style={{ fontWeight: 600 }}>{user?.employeeId}</div>
</div>
<div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
<div style={{ color: "#6b7280", fontSize: 12 }}>البريد</div>
<div style={{ fontWeight: 600 }}>{user?.email}</div>
</div>
<div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
<div style={{ color: "#6b7280", fontSize: 12 }}>الهاتف</div>
<div style={{ fontWeight: 600 }}>{user?.phone}</div>
</div>
<div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
<div style={{ color: "#6b7280", fontSize: 12 }}>المنطقة</div>
<div style={{ fontWeight: 600 }}>{user?.region}</div>
</div>
<div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
<div style={{ color: "#6b7280", fontSize: 12 }}>الحالة</div>
<div style={{ fontWeight: 600 }}>{user?.status}</div>
</div>
</section>

<h2 style={{ fontSize: 18, fontWeight: 700, margin: "16px 0 8px" }}>فروعي</h2>
<ul style={{ paddingInlineStart: 18 }}>
{(user?.assignments ?? []).map((a) => (
<li key={a.id}>
{a.branch.name} — {a.branch.city}
</li>
))}
{user?.assignments?.length === 0 && <li>لا توجد فروع معينة</li>}
</ul>
</main>
);
}