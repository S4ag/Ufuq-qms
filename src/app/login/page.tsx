"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
const [email, setEmail] = useState("admin@ufuq.local");
const [password, setPassword] = useState("ChangeMe!123");
const [loading, setLoading] = useState(false);

const onSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
await signIn("credentials", {
redirect: true,
callbackUrl: "/admin",
email,
password
});
setLoading(false);
};

return (
<div style={{ maxWidth: 420, margin: "48px auto", padding: 24, border: "1px solid #e5e7eb", borderRadius: 8 }}>
<div style={{ textAlign: "center", marginBottom: 16 }}>
<Image src="/logo.png" alt="UFUQ Official Logo" width={64} height={64} />
</div>
<h1 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 16 }}>تسجيل الدخول</h1>
<form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
type="email"
placeholder="البريد الإلكتروني"
required
style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
/>
<input
value={password}
onChange={(e)=>setPassword(e.target.value)}
type="password"
placeholder="كلمة المرور"
required
style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
/>
<button
disabled={loading}
type="submit"
style={{ padding: 12, background: "#2F855A", color: "#fff", border: 0, borderRadius: 6 }}
>
{loading ? "جاري الدخول..." : "دخول"}
</button>
</form>
<div style={{ marginTop: 10, fontSize: 12, color: "#6b7280", textAlign: "center" }}>
admin@ufuq.local / ChangeMe!123
</div>
<div style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>
employee@ufuq.local / ChangeMe!123
</div>
</div>
);
}