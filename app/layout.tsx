import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generative seed canvas — educational example",
  description: "Draw a deterministic picture from a transaction id. No network, no Math.random.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
