// src/app/layout.tsx
import "./globals.css";

export const metadata = { title: "نظام آفاق لإدارة جودة القهوة" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}